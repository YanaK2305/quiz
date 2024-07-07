import { useDispatch, useSelector } from "react-redux";
import st from "./Questions.module.scss";
import { useEffect, useState } from "react";
import {
  fetchQuestions,
  selectAnswer,
  setShowAnswers,
} from "../../redux/slices/questionsReducer";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { Blocks } from "react-loader-spinner";

export default function Questions() {
  const { data } = useSelector((state) => state.form);
  const { arr, allComplete, showAnswers, loading } = useSelector(
    (state) => state.questions
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const navigate = useNavigate();
  console.log(arr, allComplete);
  const dispatch = useDispatch();
  function styler(question, option, optionIndex) {
    if (showAnswers) {
      if (question.correct_answer === option) {
        return st.answer + " " + st.answerCorrect;
      } else if (question.selected_answer === optionIndex) {
        return st.answer + " " + st.answerWrong;
      } else {
        return st.answer;
      }
    } else {
      if (question.selected_answer === optionIndex) {
        return st.answer + " " + st.answerSelect;
      } else {
        return st.answer;
      }
    }
  }
  function checkAnswers() {
    dispatch(setShowAnswers(true));
    const correctArr = arr.filter((question) => {
      return (
        question.options[question.selected_answer] === question.correct_answer
      );
    });
    setCorrectAnswers(correctArr.length);
  }
  useEffect(() => {
    dispatch(fetchQuestions(data));
  }, []);
  if (loading) {
    return (
      <div className={st.root}>
        <div className={st.loading}>
          <Blocks
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={st.root}>
      <div className={st.container}>
        <div className={st.questions}>
          {arr.map((elem, questionIndex) => {
            return (
              <div className={st.question} key={questionIndex}>
                <h2>{parse(elem.question)}</h2>
                <div className={st.answers}>
                  {elem.options.map((option, answerIndex) => {
                    return (
                      <button
                        className={styler(elem, option, answerIndex)}
                        key={answerIndex}
                        disabled={showAnswers}
                        onClick={() =>
                          dispatch(
                            selectAnswer({
                              questionId: questionIndex,
                              answerId: answerIndex,
                            })
                          )
                        }
                      >
                        {parse(option)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className={st.result}>
          {!showAnswers ? (
            <button
              className={st.btn}
              disabled={!allComplete}
              onClick={checkAnswers}
            >
              Check answers
            </button>
          ) : (
            <>
              <h2 className={st.resultText}>
                You answered {correctAnswers} out of {arr.length} questions
                correctly
              </h2>
              <button className={st.btn} onClick={() => navigate("/")}>
                Play again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
