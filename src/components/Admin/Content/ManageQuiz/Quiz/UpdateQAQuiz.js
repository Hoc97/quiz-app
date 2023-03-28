import { useState, useEffect } from 'react';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './UpdateQAQuiz.scss';
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs';
import { AiOutlineMinusCircle, AiFillPlusSquare } from 'react-icons/ai';
import { FaRegFileAudio } from 'react-icons/fa';
import { RiImageAddFill } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from "react-awesome-lightbox";
import {
    getAllQuizForAdmin,
    getQuizWithQA,
    postUpsertQA
} from '../../../../../services/apiService';
import { urltoFile } from '../../../../../utils/commonFunction';

function UpdateQAQuiz() {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];
    const initUrlImagePreview = {
        title: '',
        url: ''
    };
    const initSelectedQuiz = { value: '', label: 'Select quiz...' };

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(initSelectedQuiz);
    const [previewImage, setPreviewImage] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [questions, setQuestions] = useState(initQuestions);
    const [urlImagePreview, setUrlImagePreview] = useState(initUrlImagePreview);
    useEffect(() => {
        fetchQuiz();
    }, []);
    useEffect(() => {
        if (selectedQuiz.value) {
            fetchQuizWithQA();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedQuiz]);

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        if (res.EC === 0) {
            //convert base64 to file object
            let newQA = [];

            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.description.indexOf(';audio,') > -1) {
                    q.audioName = q.description.slice(q.description.indexOf(';audio,') + 7);
                    q.description = q.description.slice(0, q.description.indexOf(';audio,'));
                }
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(
                        `data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
                }
                newQA.push(q);
            }
            // console.log('qa', res.DT.qa);
            setQuestions(res.DT.qa);
        }
    };
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res.EC === 0) {
            const newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                };
            });
            setListQuiz(newQuiz);
        }
    };

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            let newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    },
                ],
            };
            setQuestions([...questions, newQuestion]);
        }
        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter((n) => {
                return n.id !== id;
            });
            setQuestions(questionsClone);
        }
    };

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === 'ADD') {
            let newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            };
            let index = questionsClone.findIndex((item) => item.id === questionId);
            let answers = questionsClone[index].answers;
            questionsClone[index].answers = [...answers, newAnswer];
            setQuestions(questionsClone);
        }
        if (type === 'REMOVE') {
            let index = questionsClone.findIndex((item) => item.id === questionId);
            questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== answerId);
            setQuestions(questionsClone);
        }
    };

    const handleChange = (selectedOption) => {
        setSelectedQuiz(selectedOption);
    };

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex((item) => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            event.target.value = null;
            setQuestions(questionsClone);
        }
    };

    const handleOnChangeFileQuestionAudio = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1 && event.target.files[0]) {
            questionsClone[index].audioName = event.target.files[0].name;
            event.target.value = null;
            setQuestions(questionsClone);
        }
    };

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === 'CHECKBOX') {
                            answer.isCorrect = value;
                        }
                        if (type === 'INPUT') {
                            answer.description = value;
                        }
                    }
                    return answer;
                });

            setQuestions(questionsClone);
        }
    };

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex((item) => item.id === questionId);
        if (index > -1) {
            setUrlImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName,
            });
            setPreviewImage(true);
        }
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleSubmitQuestionQuiz = async () => {
        //validate data
        if (!selectedQuiz.value) {
            toast.error('Please select a quiz!');
            return;
        }
        for (const question of questions) {
            let indexQ = questions.indexOf(question) + 1;
            // Đang làm phần audio tạm thời ko validate phần này
            // if (!question.description) {
            //     toast.error(`Please fill in the question ${indexQ}`);
            //     return;
            // }
            // for (const answer of question.answers) {
            //     let indexA = question.answers.indexOf(answer) + 1;
            //     if (!answer.description) {
            //         toast.error(`Answer ${indexA} is empty at question ${indexQ}`);
            //         return;
            //     }
            // }
            let answerCorrect = question.answers.filter(answer => answer.isCorrect === true);
            if (answerCorrect.length === 0) {
                toast.error(`Choose the correct answer at question ${indexQ}`);
                return;
            }
        };
        // convert file object to base64 javascript
        let questionsClone = _.cloneDeep(questions);

        for (const question of questionsClone) {
            if (question.audioName) {
                question.description = question.description + `;audio,${question.audioName}`;
            }
            if (question.imageFile) {
                question.imageFile = await toBase64(question.imageFile);
            }
        }
        //Post update API Quiz QA 
        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        });
        // console.log('questionsClone', res, questionsClone);
        if (res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        }

    };
    console.log(
        [
            {
                "isMcqGroup": true,
                "id": 1595,
                "audio": "",
                "image": "",
                "video_exp_url": "",
                "reading_texts": [
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong><span style=\"font-size:20px;\">FOR SALE</span></strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">A used living room set (sofa and two armchairs) made of the finest Corinthian leather. Only one year old and in perfect condition (no scratches or stains).<br /></span>\n<span class=\"paragraph-sentence\">I'm selling them because I'm moving overseas and can't take them with me. $100 for the sofa and $50 for each chair, or <span class=\"q293-1\">$150 for the 3-piece set</span>.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><span class=\"q294-1\">Call Michael Clemons at 555-3871 or send a message to sofa4sale@yahu.com</span>.</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong><span style=\"font-size:20px;\">CẦN BÁN</span></strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Một bộ nội thất phòng khách đã qua sử dụng (sofa và 2 ghế bành) được làm từ da Corinthian hảo hạng. Mới chỉ 1 năm tuổi và còn mới (không có trầy xước hay vết ố). <br /></span>\n<span class=\"paragraph-sentence\">Tôi bán chúng vì tôi sẽ chuyển đi sống ở nước ngoài và không thể mang chúng theo. 100 đô cho sofa và 50 đô cho mỗi cái ghế, hoặc 150 đô cho trọn bộ.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Gọi cho Michael Clemons qua số 555-3871 hoặc gửi tin nhắn đến sofa4sale@yahu.com.</span></p>"
                    ],
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">To: sofasale@yahu.com<br /></span>\n<span class=\"paragraph-sentence\">From: amburton@mynet.com<br /></span>\n<span class=\"paragraph-sentence\">Subject: Furniture for sale<br /></span>\n<span class=\"paragraph-sentence\">Date: May 22nd</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><span class=\"q295-1\"><span class=\"q296-1\">I am very interested in buying the sofa you advertised in the Daily Times yesterday.</span></span> <span class=\"q297-1\">I have my own truck, so I could pick it up very easily</span>. Could I come to see the sofa tomorrow evening, at around 7:30 p.m.?</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">I look forward to hearing from you,<br /></span>\n<span class=\"paragraph-sentence\">Alex Burton Alex Burton</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Đến: sofasale@yahu.com<br /></span>\n<span class=\"paragraph-sentence\">Từ: amburton@mynet.com<br /></span>\n<span class=\"paragraph-sentence\">Tiêu đề: Nội thất cần bán<br /></span>\n<span class=\"paragraph-sentence\">Ngày: 22 tháng 5</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Tôi rất muốn mua sofa mà bạn đã quảng cáo trên tờ Daily Times hôm qua. Tôi có xe tải riêng, nên tôi có thể chuyển nó đi rất dễ dàng. Tôi có thể đến xem sofa tối mai được không, khoảng 7 giờ rưỡi tối?</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Mong nhận được phản hồi của bạn,<br /></span></p>"
                    ]
                ],
                "learnerQuestionsCount": 0,
                "mcqDatas": [
                    {
                        "id": 15422,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "How much will it cost to buy the sofa and two chairs together?",
                            "Mua sofa và 2 cái ghế chung với nhau sẽ tốn bao nhiêu tiền?"
                        ],
                        "optionA": ["50 dollars", "50 đô"],
                        "optionB": ["100 dollars", "100 đô"],
                        "optionC": ["150 dollars", "150 đô"],
                        "optionD": ["200 dollars", "200 đô"],
                        "answer": [
                            "C",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q293-1\">$150 for the 3-piece set</span>\"."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 15423,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["How can you contact the seller?", "Làm thế nào để liên lạc với người bán?"],
                        "optionA": ["Only by telephone", "Chỉ qua điện thoại"],
                        "optionB": ["Only by email", "Chỉ qua email"],
                        "optionC": ["By email and telephone", "Qua email và điện thoại"],
                        "optionD": ["By telephone and fax", "Qua điện thoại và fax"],
                        "answer": [
                            "C",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q294-1\">Call Michael Clemons at 555-3871 or send a message to sofa4sale@yahu.com</span>\"."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 15424,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "Where did Michael Clemons place this advertisement?",
                            "Michael Clemons đã đặt quảng cáo này ở đâu?"
                        ],
                        "optionA": ["On the Internet", "Trên Internet"],
                        "optionB": ["In a daily newspaper", "Trên một tờ báo địa phương"],
                        "optionC": ["In a weekly magazine", "Trên một tờ tạp chí hàng tuần"],
                        "optionD": ["On TV", "Trên truyền hình"],
                        "answer": [
                            "B",
                            "Ta thấy ý này trong câu <span class=\"quote quote-q295-1\">I am very interested in buying the sofa you advertised in the Daily Times yesterday</span>."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 15425,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["What does Alex Burton want to buy?", "Alex Burton muốn mua gì?"],
                        "optionA": ["All of the items", "Tất cả các món"],
                        "optionB": ["One chair", "1 cái ghế"],
                        "optionC": ["Two chairs", "2 cái ghế"],
                        "optionD": ["Just the sofa", "Chỉ mỗi cái sofa"],
                        "answer": [
                            "D",
                            "Ta thấy ý này trong câu <span class=\"quote quote-q296-1\">I am very interested in buying the sofa you advertised in the Daily Times yesterday</span>."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 15426,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "How will Alex Burton get his furniture home?",
                            "Alex Burton sẽ chuyển món nội thất của anh ấy về nhà như thế nào?"
                        ],
                        "optionA": ["Michael Clemons will deliver them.", "Michael Clemons sẽ vận chuyển chúng."],
                        "optionB": ["He will use his truck.", "Anh ấy sẽ dùng xe tải của mình."],
                        "optionC": ["He will use a delivery company.", "Anh ấy thuê công ty vận chuyển."],
                        "optionD": [
                            "He can't take them home, so he decides to buy nothing.",
                            "Anh ấy không mang về nhà được, nên anh ấy quyết định không mua gì."
                        ],
                        "answer": [
                            "B",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q297-1\">I have my own truck, so I could pick it up very easily</span>\"."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    }
                ],
                "testDuration": 382,
                "did_wrongly_the_last_time": false
            },
            {
                "isMcqGroup": true,
                "id": 1207,
                "audio": "",
                "image": "",
                "video_exp_url": "",
                "reading_texts": [
                    [
                        "<p class=\"reading-text-paragraph\" style=\"text-align: center;\"><span class=\"paragraph-sentence\">JOIN OUR CLUB!</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Do you like to act, sing, and dance? Would you like to meet a new group of friends as dramatic as you are? If so, then please join our performs' club. <span class=\"q81-1\"><span class=\"q82-1\">We meet every Wednesday evening</span> from seven o'clock to nine o'clock</span> at the Clark City Community Center. We can promise you a great night! <span class=\"q80-1\">Everyone is welcome.</span> We look forward to seeing you there! Email us at performclub@stagenet.com.</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"text-align: center;\"><span class=\"paragraph-sentence\"><span style=\"text-align: center;\">HÃY THAM GIA VÀO CÂU LẠC BỘ CỦA CHÚNG TÔI!</span></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Bạn có thích diễn xuất, hát và khiêu vũ? Bạn có muốn gặp gỡ nhóm bạn mới cũng sâu sắc như bạn? Nếu vậy thì hãy tham gia câu lạc bộ biểu diễn của chúng tôi. Chúng tôi gặp nhau mỗi tối thứ Tư từ bảy giờ đến chín giờ ở trung tâm cộng đồng thành phố Clark. Chúng tôi hứa bạn sẽ có một buổi tối tuyệt vời! Mọi người đều được chào đón. Chúng tôi rất mong được gặp bạn ở đó! Hãy gửi mail cho chúng tôi tại performclub@stagenet.com.</span></p>"
                    ],
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">To: performclub@stagenet.com <br/></span>\n<span class=\"paragraph-sentence\">From: MGreen@happnet.net <br/></span>\n<span class=\"paragraph-sentence\">Subject: Performers'Club <br/></span>\n<span class=\"paragraph-sentence\">Date: September 13th</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">I would like to join the performer's club because I love singing, acting, and dancing. However, <span class=\"q83-1\">I am worried that my singing and dancing are not good enough.</span> Is it OK to join even if I am not very good? Please let me know.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Thank you, <br/></span>\n<span class=\"paragraph-sentence\">Mary Green</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Đến: performclub@stagenet.com<br/></span>\n<span class=\"paragraph-sentence\">Từ: MGreen@happnet.net<br/></span>\n<span class=\"paragraph-sentence\">Chủ đề: Câu lạc bộ biểu diễn<br/></span>\n<span class=\"paragraph-sentence\">Ngày: 13 tháng 9</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Tôi rất muốn tham gia câu lạc bộ biểu diễn bởi vì tôi thích hát, diễn xuất và khiêu vũ. Tuy nhiên, tôi lo rằng khả năng hát và khiêu vũ của tôi chưa đủ tốt. Nếu chưa tốt thì tôi có tham gia được không? Xin vui lòng cho tôi biết.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Cảm ơn,<br/></span>\n<span class=\"paragraph-sentence\">Mary Green</span></p>"
                    ]
                ],
                "learnerQuestionsCount": 0,
                "mcqDatas": [
                    {
                        "id": 13277,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["Who can join the performers' club?", "Ai có thể tham gia vào câu lạc bộ biểu diễn?"],
                        "optionA": ["Anyone", "Bất kỳ ai"],
                        "optionB": ["Only men", "Chỉ đàn ông"],
                        "optionC": ["Only women", "Chỉ phụ nữ"],
                        "optionD": ["No one", "Không ai cả"],
                        "answer": [
                            "A",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q80-1\">Everyone is welcome. </span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 13278,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["How long do club meetings last?", "Các buổi gặp của câu lạc  bộ kéo dài bao lâu?"],
                        "optionA": ["Once a week", "Mỗi tuần một lần"],
                        "optionB": ["Two hours", "Hai tiếng"],
                        "optionC": ["At seven o'clock", "Lúc 7 giờ"],
                        "optionD": ["On Wednesday evening", "Vào tối thứ Tư"],
                        "answer": [
                            "B",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q81-1\">We meet every Wednesday evening from seven o'clock to nine o'clock</span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 13279,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["How often do they meet?", "Họ gặp nhau bao lâu một lần?"],
                        "optionA": ["Every day", "Mỗi ngày"],
                        "optionB": ["Three times a week", "Ba lần một tuần"],
                        "optionC": ["Twice a week", "Một tuần hai lần"],
                        "optionD": ["Once a week", "Một tuần một lần"],
                        "answer": [
                            "D",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q82-1\">We meet every Wednesday evening</span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 13280,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["Why is Mary Green worried?", "Tại sao Mary Green lo lắng?"],
                        "optionA": ["She can't find the community center.", "Cô ấy không tìm thấy trung tâm cộng đồng."],
                        "optionB": ["She is not a good singer.", "Cô ấy không phải là một ca sĩ hay."],
                        "optionC": ["She is very dramatic.", "Cô ấy rất sâu sắc."],
                        "optionD": ["She is not good at meeting new people.", "Cô ấy không giỏi trong việc gặp gỡ người mới."],
                        "answer": [
                            "B",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q83-1\">I am worried that my singing and dancing are not good enough. </span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    }
                ],
                "testDuration": 306,
                "did_wrongly_the_last_time": false
            },
            {
                "isMcqGroup": true,
                "id": 1419,
                "audio": "",
                "image": "",
                "video_exp_url": "",
                "reading_texts": [
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">To: Fran Morris(fran@friendlyflowers.com) <br/></span>\n<span class=\"paragraph-sentence\">From: Jerry Sprigs(jerry@irvingcountryclub.com) <br/></span>\n<span class=\"paragraph-sentence\">Subject: Delivery Request</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Dear Ms. Morris,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">I am writing to inform you that <span class=\"q198-1\">the McGuiness Women's Foundation Luncheon, which was scheduled to take place this Saturday at 3 p.m., has been postponed to Sunday at 2 p.m., due to predictions of showers</span>. Therefore, I would like to change the delivery time for the flower arrangements we ordered. Would you be able to deliver the flowers either Saturday morning, or between 2:00 p.m. and 4:00 p.m. Saturday afternoon? Also, if you choose to deliver the flowers on Saturday afternoon, please do not take the flowers to the Club House; <span class=\"q199-1\">we will be hosting a charity lunch</span> for the Rotary Club at that time, and the area will be full of people. Instead, could you please bring the flowers to the Maintenance building next to the botanical gardens? <span class=\"q202-1\">If you can bring the flowers in the morning, just take them directly to the Club House</span> as we originally discussed. Please e-mail me immediately to confirm these changes.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Regards, <br/></span>\n<span class=\"paragraph-sentence\">Jerry Sprigs <br/></span>\n<span class=\"paragraph-sentence\">Manager, Irving Country Club</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Đến: Fran Morris(fran@friendlyflowers.com) <br/></span>\n<span class=\"paragraph-sentence\">Từ: Jerry Sprigs(jerry@irvingcountryclub.com) <br/></span>\n<span class=\"paragraph-sentence\">Chủ đề: Yêu cầu giao hàng</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Cô Morris thân mến,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Tôi viết email này để báo cho cô biết rằng bữa tiệc trưa của Hội Phụ nữ McGuiness, theo lịch sẽ diễn ra vào thứ Bảy tuần này lúc 3 giờ chiều, đã được dời qua Chủ Nhật lúc 2 giờ, do dự báo có mưa. vì thế, tôi muốn thay đổi thời gian giao hoa mà chúng tôi đã đặt. Cô có thể giao hàng vào sáng thứ Bảy hoặc là trưa thứ Bảy từ 2 giờ đến 4 giờ chiều được không? Còn nữa, nếu cô chọn giao vào chiều thứ Bảy, xin vui lòng đừng giao đến Club House; chúng tôi đang tổ chức bữa trưa từ thiện vào lúc đó cho Rotary Club và khu vực đó sẽ rất đông người. Thay vì thế, cố có thể mang hoa đến toàn nhà bảo trì, bên cạnh vườn hoa được không? Nếu cô giao hoa đến vào buổi sáng, hãy mang chúng đến Club House như đã bàn trước. Xin vui lòng gửi email cho tôi để xác nhận những thay đổi này.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Trân trọng<br/></span>\n<span class=\"paragraph-sentence\">Jerry Sprigs<br/></span>\n<span class=\"paragraph-sentence\">Giám đốc, Irving Country Club</span></p>"
                    ],
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">To: Jerry Sprigs(jerry@irvingcountryclub.com) <br/></span>\n<span class=\"paragraph-sentence\">From: Fran Morris(fran@friendlyflowers.com) <br/></span>\n<span class=\"paragraph-sentence\">Subject: RE: Delivery Request</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Dear Mr. Sprigs,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">I received your request to change the date and time we deliver your flowers. Unfortunately, we are completely booked in the afternoon on Saturday and will not be able to deliver the flowers at the time you requested. <span class=\"q202-2\">We would be happy to deliver the flowers between 10:00 a.m. and 12 p.m. on Saturday</span>. Also, <span class=\"q200-1\">I should inform you that Friendly Flowers charges $25 for any changes that are made to orders on such short notice.</span> I apologize for this inconvenience, but it helps us provide the most <strong><span class=\"q201-1\">reliable</span></strong> service possible. I will be out of the office this afternoon, so please call me on my cell phone at 369-654-9876.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Sincerely, <br/></span>\n<span class=\"paragraph-sentence\">Fran Morris  <br/></span>\n<span class=\"paragraph-sentence\">Owner, Friendly Flowers</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Đến: Jerry Sprigs(jerry@irvingcountryclub.com) <br/></span>\n<span class=\"paragraph-sentence\">Từ: Fran Morris(fran@friendlyflowers.com) <br/></span>\n<span class=\"paragraph-sentence\">Chủ đề: Về việc: yêu cầu giao hàng</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Ông Sprigs thân mến</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Tôi nhận được yêu cầu của ông về việc thay đổi ngày và thời gian giao hoa. Không may, chúng tôi  không còn thời gian trống vào buổi chiều thứ bảy và không thể giao hoa vào thời gian mà ông yêu cầu. Chúng tôi rất sẵn lòng được giao hoa từ 10 giờ sáng đến 12 giờ trưa thứ Bảy. Còn nữa, tôi phải báo với ông rằng Friendly Flowers tính phí 25 đô cho nhửng đơn hàng nào có thay đổi sát giờ như vậy. tôi xin lổi về sự bất tiện này, nhưng nó giúp chúng tôi cung cấp dịch vụ đáng tin cậy nhất có thể. Tôi không ở trong văn phòng vào chiều nay, vì thế hãy gọi di động theo số 369-654-9876.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Trân trọng<br/></span>\n<span class=\"paragraph-sentence\">Fran Morris<br/></span>\n<span class=\"paragraph-sentence\">Chủ cửa hàng Friendly Flowers</span></p>"
                    ]
                ],
                "learnerQuestionsCount": 0,
                "mcqDatas": [
                    {
                        "id": 14459,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "Why does Jerry Sprigs want to change the delivery time?",
                            "Tại sao Jerry Sprigs muốn tay đổi thời gian giao hàng?"
                        ],
                        "optionA": ["The planned event was delayed.", "Sự kiện bị hoãn."],
                        "optionB": ["The Club House is closed.", "Club House đóng cửa."],
                        "optionC": ["The members requested it.", "Các thành viên yêu cầu."],
                        "optionD": ["The event starts earlier.", "Sự kiện bắt đầu sớm hơn."],
                        "answer": [
                            "A",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q198-1\">the McGuiness Women's Foundation Luncheon, which was scheduled to take place this Saturday at 3 p.m., has been postponed to Sunday at 2 p.m., due to predictions of showers</span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 14460,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["What is TRUE about the Irving Country Club?", "Câu nào ĐÚNG về Irving Country Club?"],
                        "optionA": ["It is a popular place for weddings.", "Nó là một nơi phổ biến để tổ chức đám cưới."],
                        "optionB": ["It will host a fundraising event.", "Nó sẽ tổ chức sự kiện gây quỹ."],
                        "optionC": ["It has international golf tournaments.", "Nó có các giải đấu golf quốc tế."],
                        "optionD": ["It is famous for its botanical gardens.", "Nó nổi tiếng với vườn thực vật."],
                        "answer": [
                            "B",
                            "Ta thấy địa chỉ email của ông Sprigs là (jerry@irvingcountryclub.com) ->ông Sprigs đến từ Irving Country Club.<br/>Mà trong email thứ nhất do ông Sprigs  gửi có câu \"<span class=\"quote quote-q199-1\">we will be hosting a charity lunch</span>\" -> Irving Country Club sẽ tổ chức một sự kiện từ thiện"
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 14461,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "What should Mr. Sprigs do to change an order?",
                            "Ông sprigs nên làm gì để thay đổi đơn hàng?"
                        ],
                        "optionA": ["Provide at least 24 hours' notice", "Thông báo trước ít nhất 24 tiếng"],
                        "optionB": ["Fill out an electronic form", "Điền vào đơn điện tử"],
                        "optionC": ["Submit a written request", "Nộp yêu cầu bằng văn bản"],
                        "optionD": ["Pay a small fee", "Trả một khoản phí nhỏ"],
                        "answer": [
                            "D",
                            "Ta thấy ý này trong câu \"<span class=\"quote quote-q200-1\">I should inform you that Friendly Flowers charges $25 for any changes that are made to orders on such short notice. </span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 14462,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "In the second e-mail, the word \"reliable\" is closest in meaning to",
                            "Trong email thứ hai, từ \"reliable\" gần nghĩa nhất với"
                        ],
                        "optionA": ["arguable", "gây tranh cãi"],
                        "optionB": ["transferable", "có thể chuyển nhượng được"],
                        "optionC": ["questionable", "gây nghi vấn"],
                        "optionD": ["dependable", "có thể tin cậy được"],
                        "answer": ["D", "\"<span class=\"quote quote-q201-1\">reliable</span>\" = có thể tin cậy được"],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 14463,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "How will Fran Morris most likely deliver the flowers?",
                            "Fran Morris có thể sẽ giao hoa bằng cách nào?"
                        ],
                        "optionA": ["By meeting Jerry Sprigs at the office", "Gặp Jerry Sprigs ở văn phòng"],
                        "optionB": ["By going to the Rotary Club", "Đi đến Rotary Club"],
                        "optionC": ["By dropping them off at the Club House", "Giao chúng đến Club House"],
                        "optionD": ["By driving to the Maintenance building", "Lái xe đến tòa nhà bảo trì"],
                        "answer": [
                            "C",
                            "Ta thấy trong email thứ nhất, ông Sprigs nói \"<span class=\"quote quote-q202-1\">If you can bring the flowers in the morning, just take them directly to the Club House</span>\" Trong email thứ hai, cô Morris nói \"<span class=\"quote quote-q202-2\">We would be happy to deliver the flowers between 10:00 a.m. and 12 p.m. on Saturday</span>\" -> cô Morris sẽ giao vào buổi sáng -> cô sẽ giao đến Club House."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    }
                ],
                "testDuration": 382,
                "did_wrongly_the_last_time": false
            },
            {
                "isMcqGroup": true,
                "id": 1096,
                "audio": "",
                "image": "",
                "video_exp_url": "",
                "reading_texts": [
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong>To: registration@fcc.ac.us </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>From: Sallyday@tinynet.come</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Subject: Free courses</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Date: August 3 2006</strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Dear Sir,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">I work in the Foothills Community College canteen, and I recently heard about free courses offered by the college. Is it true that all full-time staff can apply for these courses? <span class=\"q67-1\">I have been working here since the middle of June</span>, and I am very interested in studying. <span class=\"q66-1\">Please send me further information about these course and the application process.</span></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Thank you for your assistance.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Sally Day</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong>Đến: registration@fcc.ac.us </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Từ: Sallyday@tinynet.come </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Chủ đề: Những khóa học miễn phí </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Ngày: 3 tháng 8 năm 2006</strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Thưa ông,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Tôi làm việc trong căn-tin của trường cao đẳng cộng đồng Foothills, và gần đây tôi có nghe nói về những khóa học miễn phí do trường cung cấp. Có đúng là tất cả các nhân viên toàn thời gian đều có thể nộp đơn học những khóa này? Tôi đã làm việc ở đây từ giữa tháng 6, và tôi rất hứng thú với việc học. Xin vui lòng gửi cho tôi thông tin thêm về những khóa học này và quy trình nộp đơn.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Cảm ơn sự giúp đỡ của ông.</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Sally Day</span></p>"
                    ],
                    [
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong>To: Sallyday@tinynet.com</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>From: registration@fcc.ac.us</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Subject: Re: free courses</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Date: August 4 2006</strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Dear Sally,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Here is our free course online information brochure: <br/></span>\n<span class=\"paragraph-sentence\">Foothills Community College is now pleased to <span class=\"q67-2\">offer free college courses to all of its full-time staff and faculty</span>. Funding for these courses has been provided by the State of Oregon and is available to all full-time staff and faculty who have been working at the college for at least three months. To register for classes:</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">1. Obtain a class request from the department secretary. <br/></span>\n<span class=\"paragraph-sentence\">2. Make sure your classes do not interfere with your normal work schedule.<br/></span>\n<span class=\"paragraph-sentence\">3. <span class=\"q70-1\">Present your selections to your supervisor and obtain his or her signature.</span><br/></span>\n<span class=\"paragraph-sentence\">4. <span class=\"q68-1\">Register for your classes online through the college website.</span><br/></span>\n<span class=\"paragraph-sentence\">5. When you are asked for payment method, enter your departmental code. <span class=\"q67-3\">Your confirmation for registration will be sent to your email account</span> within one working day.</span></p>",
                        "<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\"><strong>Đến: Sallyday@tinynet.com</strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Từ: registration@fcc.ac.us </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Chủ đề: Về việc: Những khóa học miễn phí </strong><br/></span>\n<span class=\"paragraph-sentence\"><strong>Ngày: 4 tháng 8 năm 2006 </strong></span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Sally thân mến,</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">Đây là tập thông tin trực tuyến của khóa học miễn phí:<br/></span>\n<span class=\"paragraph-sentence\">Trường cao đẳng cộng đồng Foothills rất vui được cung cấp những khóa học đại học miễn phí cho tất cả các nhân viên toàn thời gian và các khoa của trường. Quỹ cho những khóa học này được cung cấp bởi bang Oregon và có sẵn cho tất cả các nhân viên toàn thời gian và nhân viên các khoa đã làm việc ở trường ít nhất là 3 tháng. Để đăng ký lớp học:</span></p>\n<p class=\"reading-text-paragraph\" style=\"\"><span class=\"paragraph-sentence\">1. Nhận phiếu yêu cầu lớp từ  thư ký của phòng<br/></span>\n<span class=\"paragraph-sentence\">2. Đảm bảo rằng các lớp học của bạn sẽ không gây gián đoạn lịch làm việc thường ngày.<br/></span>\n<span class=\"paragraph-sentence\">3. Trình những lựa chọn của bạn cho người giám sát và xin chữ ký của anh/cô ấy.<br/></span>\n<span class=\"paragraph-sentence\">4. Đăng ký lớp học trực tuyến thông qua trang web của trường.<br/></span>\n<span class=\"paragraph-sentence\">5. Khi được hỏi hình thức thanh toán, hãy nhập mã phòng ban của mình. Thư xác nhận đăng ký sẽ được gửi đến tài khoản email của bạn trong vòng một ngày làm việc.</span></p>"
                    ]
                ],
                "learnerQuestionsCount": 0,
                "mcqDatas": [
                    {
                        "id": 12541,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "Why did Sally send an email to the community college?",
                            "Tại sao Sally gửi email đến trường cao đẳng cộng đồng?"
                        ],
                        "optionA": ["She wants a job in the canteen.", "Cô ấy muốn một công việc trong căn-tin."],
                        "optionB": [
                            "She wants to find out about degree programs.",
                            "Cô ấy muốn tìm hiểu về chương trình học lấy bằng."
                        ],
                        "optionC": [
                            "She wants to find out about free programs.",
                            "Cô ấy muốn tìm hiểu về chương trình học miễn phí."
                        ],
                        "optionD": ["She wants to complain about fees.", "Cô ấy muốn phàn nàn về học phí."],
                        "answer": [
                            "C",
                            "Xem chủ đề  của email là về những khóa học miễn phí và trong email cô có viết \"<span class=\"quote quote-q66-1\">Please send me further information about these course and the application process. </span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 12542,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": ["Which of the following is NOT true?", "Câu nào sau đây KHÔNG đúng?"],
                        "optionA": ["Sally is eligible for the courses.", "Sally có đủ điều kiện để được học những khóa này."],
                        "optionB": [
                            "Sally is a community college employee.",
                            "Sally là một nhân viên của trường cao đẳng cộng đồng."
                        ],
                        "optionC": [
                            "Only full-time staff and faculty can take free courses.",
                            "Chỉ có nhân viên toàn thời gian và nhân viên các khoa có thể học những khóa học miễn phí này."
                        ],
                        "optionD": ["Confirmations are sent by email.", "Thư xác nhận sẽ được gửi bằng email."],
                        "answer": [
                            "A",
                            "Ta thấy đáp án B trong \"<span class=\"quote quote-q67-1\">I have been working here since the middle of June</span>\" ->Sally là nhân viên của trường.<br/>Ta thấy đáp án C trong \"<span class=\"quote quote-q67-2\">offer free college courses to all of its full-time staff and faculty</span>\".<br/>Ta thấy đáp án D trong \"<span class=\"quote quote-q67-3\">Your confirmation for registration will be sent to your email account</span>\".<br/>Không thấy nhắc đến đáp án A ->chọn A."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 12543,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": null,
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "How can a person register for classes?",
                            "Một người có thể đăng ký lớp học bằng cách nào?"
                        ],
                        "optionA": ["On the telephone", "Trên điện thoại"],
                        "optionB": ["In the department", "Trong phòng ban"],
                        "optionC": ["By mail", "Bằng thư"],
                        "optionD": ["Online", "Trực tuyến"],
                        "answer": [
                            "D",
                            "Ta thấy ý này trong \"<span class=\"quote quote-q68-1\">Register for your classes online through the college website.</span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 12544,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": "",
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "According to the second step, what must applicants do?",
                            "Theo như  bước thứ 2, người nộp đơn phải làm gì?"
                        ],
                        "optionA": ["Talk to the supervisor", "Nói chuyện với giám sát"],
                        "optionB": ["Pay for the classes", "Trả tiền học"],
                        "optionC": ["Check their work schedule", "Kiểm tra lịch làm việc của mình"],
                        "optionD": ["Confirm their registration", "Xác nhận đăng ký"],
                        "answer": [
                            "C",
                            "Theo bước 2, người học phải đảm bảo lớp học không ảnh hưởng đến lịch làm việc của họ -> họ phải kiểm tra lịch làm việc của mình xem có bị ảnh hưởng hay không."
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    },
                    {
                        "id": 12545,
                        "isMcqGroup": false,
                        "image": "",
                        "hintImage": null,
                        "audio": ["", "", "", "", ""],
                        "question": [
                            "What must applicants receive from their supervisors?",
                            "Người nộp đơn phải nhận được gì từ giám sát của họ?"
                        ],
                        "optionA": ["A signature", "Chữ ký"],
                        "optionB": ["Permission", "Sự cho phép"],
                        "optionC": ["Payment information", "Thông tin thanh toán"],
                        "optionD": ["A class schedule", "Lịch học"],
                        "answer": [
                            "A",
                            "Ta thấy ý này trong bước 3: \"<span class=\"quote quote-q70-1\">Present your selections to your supervisor and obtain his or her signature. </span>\""
                        ],
                        "video_exp_url": "",
                        "grammar_links_info": [],
                        "annotatedVocabs": [],
                        "learnerQuestionsCount": 0,
                        "testDuration": 76
                    }
                ],
                "testDuration": 382,
                "did_wrongly_the_last_time": false
            }
        ]
    );



    return (
        <div className='question-container' >
            <div className='question-add'>
                <div className='mb-3 col-6'>
                    <Form.Label>Select quiz:</Form.Label>
                    <Select
                        value={selectedQuiz}
                        onChange={handleChange}
                        options={listQuiz}
                        placeholder="Question type"
                    />
                </div>
                <div>Add question:</div>
                {questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={index} className='q-main'>
                                <div className='question-content row'>
                                    <div className='description col-6'>
                                        <FloatingLabel label={`Question description ${index + 1}`} className='mb-1'>
                                            <Form.Control
                                                type='text'
                                                onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)}
                                                value={question.description}
                                                placeholder='Description'
                                            />
                                        </FloatingLabel>
                                    </div>
                                    <div className='question-upload-image col'>
                                        <Form.Group className='upload-image'>
                                            {/* Upload audio */}
                                            <Form.Label className='btn-upload' htmlFor={`${question.id}-audio`}>
                                                <FaRegFileAudio />
                                            </Form.Label>

                                            <div className='file-upload'>
                                                {question.audioName ?
                                                    <span className='preview-image'>
                                                        {question.audioName}
                                                    </span>
                                                    :
                                                    '0 audio is uploaded'}
                                            </div>
                                            <Form.Control type='file' id={`${question.id}-audio`} hidden
                                                onChange={(e) => handleOnChangeFileQuestionAudio(question.id, e)}
                                            />
                                            {/* Upload image */}
                                            <Form.Label className='btn-upload' htmlFor={`${question.id}`}>
                                                <RiImageAddFill />
                                            </Form.Label>

                                            <div className='file-upload'>
                                                {question.imageName ?
                                                    <span className='preview-image'
                                                        onClick={() =>
                                                            handlePreviewImage(question.id)}>{question.imageName}
                                                    </span>
                                                    :
                                                    '0 image is uploaded'}
                                            </div>
                                            <Form.Control type='file' id={`${question.id}`} hidden
                                                onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                                            />
                                        </Form.Group>
                                        <Form.Group className='img-preview-small'>
                                            {showImage ? (
                                                <img className='image' src={previewImage} alt='' />
                                            ) : previewImage ? (
                                                <span className='previewImage' onClick={() => setShowImage(true)}>
                                                    Preview Image
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </Form.Group>
                                        <div className='btn-add'>
                                            <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                                <BsFillPatchPlusFill className='icon-add' />
                                            </span>
                                            {questions.length > 1 && (
                                                <span
                                                    onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                    <BsFillPatchMinusFill className='icon-remove' />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {question?.answers?.length > 0 &&
                                    question?.answers?.map((answer, index) => {
                                        return (
                                            <div key={index} className='answers-content'>
                                                <Form.Check type='checkbox' checked={answer.isCorrect} className='iscorrect'
                                                    onChange={(e) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, e.target.checked)}
                                                />
                                                <div className='description col-6 col'>
                                                    <FloatingLabel label={`Answer ${index + 1}`} className='mb-1'>
                                                        <Form.Control
                                                            className={answer.isCorrect && answer.description && 'is-valid'}
                                                            type='text'
                                                            onChange={(e) => handleAnswerQuestion('INPUT', question.id, answer.id, e.target.value)}
                                                            value={answer.description}
                                                            placeholder='Description'
                                                        />
                                                    </FloatingLabel>
                                                </div>
                                                <div className='btn-add'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                        <AiFillPlusSquare className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 && (
                                                        <span
                                                            onClick={() =>
                                                                handleAddRemoveAnswer('REMOVE', question.id, answer.id)
                                                            }
                                                        >
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}

                            </div>
                        );
                    })}
                {previewImage &&
                    <Lightbox
                        image={urlImagePreview.url}
                        title={urlImagePreview.title}
                        onClose={() => setPreviewImage(false)}
                    >
                    </Lightbox>}
                {questions.length > 0 &&
                    <div className='text-end' onClick={() => handleSubmitQuestionQuiz()}>
                        <Button variant="warning ">Update question</Button>
                    </div>
                }
            </div>
        </div>
    );
}
export default UpdateQAQuiz;
