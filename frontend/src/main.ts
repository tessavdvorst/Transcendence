import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import axiosInstance from './axiosConfig';
import App from './App.vue';
import Home from './components/Home.vue';
import Play from './components/pong/Play.vue';
import Auth from './components/Auth/AuthCheck.vue';
import Login from './components/Auth/AuthRedirect.vue';
import Leaderboard from './components/LeaderboardComponent.vue';
import PopulateDatabase from './components/PopulateDatabase.vue';
import ChatBox from './components/Chat/ChatBox.vue';

const routes: RouteRecordRaw[] = [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/play',
      component: Play,
    },
    {
      path: '/auth',
      component: Auth,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/leaderboard',
      component: Leaderboard,
    },
    {
    path: '/populatedatabase',
    component: PopulateDatabase,
    },
    {
      path: '/chat',
      component: ChatBox,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App).use(router);
app.use(router);
app.config.globalProperties.$axios = axiosInstance;
app.mount('#app');