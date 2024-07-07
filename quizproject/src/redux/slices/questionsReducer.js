import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ассинхронный redux

const initialState = {
  arr: [],
  loading: false,
  error: "",
  allComplete: false,
  showAnswers: false,
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  (data) => {
    return axios
      .get(
        `https://opentdb.com/api.php?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`
      )
      .then((json) => json.data);
  }
);

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    selectAnswer: (state, action) => {
      state.arr = state.arr.map((elem, index) => {
        if (action.payload.questionId === index) {
          return { ...elem, selected_answer: action.payload.answerId };
        } else return elem;
      });
      state.allComplete = state.arr.every(
        (elem) => elem.selected_answer !== undefined
      );
    },
    setShowAnswers: (state, action) => {
      state.showAnswers = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.arr = action.payload.results.map((elem) => {
        return {
          question: elem.question,
          correct_answer: elem.correct_answer,
          options: elem.incorrect_answers
            .concat([elem.correct_answer])
            .sort(() => Math.random() - 0.5),
          // concat соединение массивов
          selected_answer: undefined,
        };
      });
      state.allComplete = false;
      state.showAnswers = false;
    });
    builder.addCase(fetchQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.arr = [];
    });
  },
});
export default questionsSlice.reducer;
export const { selectAnswer, setShowAnswers } = questionsSlice.actions;
