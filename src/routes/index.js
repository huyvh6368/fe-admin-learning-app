import DashBoard from "../pages/Dashboard"
import LoginPage from "../pages/Login"
import Register from "../pages/Register"
import Level from "../pages/Level"
import AddLevel from '../pages/Level/addLevel'
import Topic from "../pages/Topic"
import AddTopic from '../pages/Topic/addTopic'

import Question from '../pages/Question'
import AddQuestion from "../pages/Question/AddQuestion"

import Answer from "../pages/Answer"

import Rank from "../pages/Rank"


const RouterUrl = [
    { name: "DashBoard", path: "/", component: DashBoard },
    { name: "Level", path: "/level", component: Level },
    { name: "Level", path: "/level/add", component: AddLevel },

    { name: "Topic", path: "/topic", component: Topic },
    { name: "Topic", path: "/topic/add", component: AddTopic },

    { name: "Question", path: "/question/:id", component: Question },
    { name: "Question", path: "/question/add/:id", component: AddQuestion },

    { name: "answer", path: "/answer/:id", component: Answer },

    { name: "rank", path: "/rank", component: Rank },


    { name: "LoginPage", path: "/login", component: LoginPage, layout: null },
    { name: "Register", path: "/register", component: Register, layout: null },
]
export default RouterUrl;