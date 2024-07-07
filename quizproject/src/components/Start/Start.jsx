import st from "./Start.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { setFormData } from "../../redux/slices/formReducer";
export default function Start() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    amount: "1",
    category: "",
    difficulty: "",
    type: "",
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .min(5, "at least 5 questions")
      .max(25, "maximum 25 questions")
      .required("amount is required"),
    category: Yup.string().required("category is required"),
    difficulty: Yup.string().required("difficulty is required"),
    type: Yup.string().required("type is required"),
  });
  function onSubmit(values) {
    dispatch(setFormData(values));
    navigate("/questions");
  }

  return (
    <div className={st.root}>
      <div className={st.container}>
        <h1>Quiz</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, isValid, dirty }) => {
            return (
              <Form action="">
                <div className={st.inputContainer}>
                  <label htmlFor="amount">Number of Questions:</label>
                  <Field
                    type="number"
                    name="amount"
                    className={
                      errors.amount && touched.amount ? st.inputError : ""
                    }
                  />
                  <ErrorMessage
                    className={st.error}
                    name="amount"
                    component={"span"}
                  />
                </div>
                <div className={st.inputContainer}>
                  <label htmlFor="category">Select Category:</label>
                  <Field
                    as="select"
                    name="category"
                    className={
                      errors.category && touched.category ? st.inputError : ""
                    }
                  >
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">
                      Entertainment: Musicals &amp; Theatres
                    </option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">
                      Entertainment: Japanese Anime &amp; Manga
                    </option>
                    <option value="32">
                      Entertainment: Cartoon &amp; Animations
                    </option>
                  </Field>
                  <ErrorMessage
                    className={st.error}
                    name="category"
                    component={"span"}
                  />
                </div>
                <div className={st.inputContainer}>
                  <label htmlFor="difficulty">Select Difficulty:</label>
                  <Field
                    as="select"
                    name="difficulty"
                    id=""
                    className={
                      errors.difficulty && touched.difficulty
                        ? st.inputError
                        : ""
                    }
                  >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Field>
                  <ErrorMessage
                    className={st.error}
                    name="difficulty"
                    component={"span"}
                  />
                </div>
                <div className={st.inputContainer}>
                  <label htmlFor="type">Select Type:</label>
                  <Field
                    as="select"
                    name="type"
                    id=""
                    className={errors.type && touched.type ? st.inputError : ""}
                  >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                  </Field>
                  <ErrorMessage
                    className={st.error}
                    name="type"
                    component={"span"}
                  />
                </div>
                <div className={st.bottom}>
                  <button
                    type="submit"
                    className={!(dirty && isValid) ? st.buttonError : ""}
                  >
                    Start Quiz
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
