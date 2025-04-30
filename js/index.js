console.clear();

const wrapper = getElement("page-wrapper");
const navButtonHome = getElement("nav-button-home");
const navButtonBookmarks = getElement("nav-button-bookmarks");
const navButtonAdd = getElement("nav-button-add");
const navButtonProfile = getElement("nav-button-profile");

let questions = [
  {
    id: "0",
    question: "Question 1",
    answer: "Answer 1",
    tags: ["html", "css", "js"],
    isBookmarked: false,
  },
  {
    id: "1",
    question: "Question 2",
    answer: "Answer 2",
    tags: ["css", "js"],
    isBookmarked: true,
  },
  {
    id: "2",
    question: "Question 3",
    answer: "Answer 3",
    tags: ["html", "js"],
    isBookmarked: false,
  },
  {
    id: "3",
    question: "Question 4",
    answer: "Answer 4",
    tags: ["html", "css", "js"],
    isBookmarked: false,
  },
  {
    id: "4",
    question: "Question 5",
    answer: "Answer 5",
    tags: ["html", "css", "js"],
    isBookmarked: false,
  },
];

function addQuestion(newQuestion) {
  questions.push(newQuestion);
}

function updateQuestion(updatedQuestion) {
  const updatedQuestions = questions.map((question) => {
    if (question.id === updatedQuestion.id) {
      return updatedQuestion;
    } else {
      return question;
    }
  });

  questions = updatedQuestions;
}

navButtonHome.addEventListener("click", () => {
  navButtonHome.classList.add("nav__link--active");
  navButtonBookmarks.classList.remove("nav__link--active");
  navButtonAdd.classList.remove("nav__link--active");
  navButtonProfile.classList.remove("nav__link--active");
  HomePage(questions);
});

navButtonBookmarks.addEventListener("click", () => {
  navButtonHome.classList.remove("nav__link--active");
  navButtonBookmarks.classList.add("nav__link--active");
  navButtonAdd.classList.remove("nav__link--active");
  navButtonProfile.classList.remove("nav__link--active");
  BookmarksPage(questions);
});

navButtonAdd.addEventListener("click", () => {
  navButtonHome.classList.remove("nav__link--active");
  navButtonBookmarks.classList.remove("nav__link--active");
  navButtonAdd.classList.add("nav__link--active");
  navButtonProfile.classList.remove("nav__link--active");
  AddPage(questions);
});

navButtonProfile.addEventListener("click", () => {
  navButtonHome.classList.remove("nav__link--active");
  navButtonBookmarks.classList.remove("nav__link--active");
  navButtonAdd.classList.remove("nav__link--active");
  navButtonProfile.classList.add("nav__link--active");
  ProfilePage();
});

HomePage(questions);

function HomePage(currentQuestions) {
  wrapper.innerHTML = "";

  const list = document.createElement("ul");
  list.className = "layout__card-list";

  currentQuestions.forEach((question) => {
    const element = Card(question);
    list.append(element);
  });

  wrapper.append(list);
}

function BookmarksPage(questions) {
  wrapper.innerHTML = "";

  const list = document.createElement("ul");
  list.className = "layout__card-list";

  questions
    .filter((question) => question.isBookmarked)
    .forEach((question) => {
      const element = Card(question);
      list.append(element);
    });

  wrapper.append(list);
}

function AddPage() {
  wrapper.innerHTML = "";

  const pageContent = Form();

  wrapper.append(pageContent);
}

function ProfilePage() {
  wrapper.innerHTML = "";

  const profile = document.createElement("div");
  profile.className = "profile";

  profile.innerHTML = ` <div class="profile__top-wrapper">
        <h2 class="profile__name">Jane Doe</h2>
        <img
          class="profile__image"
          src="https://randomuser.me/api/portraits/women/18.jpg"
          alt=""
        />
      </div>
      <p class="profile__bio">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sunt
        id, impedit quibusdam exercitationem, nihil commodi voluptatem eaque
        illo dicta nulla maxime doloribus non dolor aut! Aspernatur similique
        assumenda eum?
      </p>
      <ul class="counter">
        <li class="counter__item">
          <svg
            class="counter__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
          <span class="counter__value">9</span>
        </li>
        <li class="counter__item">
          <svg
            class="counter__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span class="counter__value">2</span>
        </li>
      </ul>
      <label class="dark-mode">
        Dark Mode
        <input type="checkbox" hidden data-js='dark-mode-toggle' ${
          document.body.classList.contains("dark") ? "checked" : ""
        }/>
        <div class="dark-mode__toggle">
          <div class="dark-mode__toggle-handle"></div>
        </div>
      </label>`;

  const toggle = getElement("dark-mode-toggle", profile);
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });
  wrapper.append(profile);
}

function Card(questionData) {
  const card = document.createElement("article");

  card.className = "card";
  card.innerHTML = `
    <h2 class="card__question" data-js='question'></h2>
            <button class="card__button" data-js='answer-button'>Show Answer</button>
            <span class="card__answer" data-js='answer'></span>
            <ul class="tag-list" data-js='tags'>
            </ul>
            <button class="bookmark" data-js='bookmark-button'>
              <svg
                class="bookmark__icon ${
                  questionData.isBookmarked ? "bookmark__icon--active" : ""
                }"
                data-js="bookmark-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </button>
  `;

  const questionElement = getElement("question", card);
  const answerElement = getElement("answer", card);
  const answerButton = getElement("answer-button", card);
  const tagList = getElement("tags", card);
  const bookmarkButton = getElement("bookmark-button", card);
  const bookmarkIcon = getElement("bookmark-icon", card);

  questionElement.textContent = questionData.question;
  answerElement.textContent = questionData.answer;
  questionData.tags.forEach((tag) => {
    const element = Tag(tag);
    tagList.append(element);
  });

  answerButton.addEventListener("click", () => {
    answerElement.classList.toggle("card__answer--visible");

    if (answerElement.classList.contains("card__answer--visible")) {
      answerButton.textContent = "Hide Answer";
    } else {
      answerButton.textContent = "Show Answer";
    }
  });

  bookmarkButton.addEventListener("click", () => {
    // change questionData
    questionData.isBookmarked = !questionData.isBookmarked;

    // update UI
    if (questionData.isBookmarked) {
      bookmarkIcon.classList.add("bookmark__icon--active");
    } else {
      bookmarkIcon.classList.remove("bookmark__icon--active");
    }

    // keep data array up to date
    updateQuestion(questionData);
  });

  return card;
}

function Tag(tag) {
  const tagElement = document.createElement("li");
  tagElement.className = "tag-list__item";
  tagElement.textContent = tag;

  return tagElement;
}

function Form() {
  const form = document.createElement("form");
  form.className = "form";
  form.innerHTML = ` <label>
    Question
    <input type="text" name="question" />
    </label>
  <label>
    Answer
    <input type="text" name="answer" />
    </label>  <label>
    Tags
    <input type="text" name="tags" />
  </label>
  <button>Submit</button>`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newQuestion = {
      id: crypto.randomUUID(),
      question: data.question,
      answer: data.answer,
      tags: data.tags.split(","),
    };

    addQuestion(newQuestion);
    form.reset();
  });

  return form;
}

function getElement(datajsTag, element = document) {
  return element.querySelector(`[data-js="${datajsTag}"]`);
}
