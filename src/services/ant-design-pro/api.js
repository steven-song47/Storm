// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
import { post } from '../utils/request';
import * as CONFIG from './config';
/** 获取当前的用户 GET /api/currentUser */

export async function currentUser(options) {
  return request('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 POST /api/login/outLogin */

export async function outLogin(options) {
  return request('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/notices */

export async function getNotices(options) {
  return request('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
// /** 获取规则列表 GET /api/rule */

// 卡管理 Project
export async function test(params) {
  // console.info(params)
  let url = CONFIG.ADD_CARD;
  return post(url, {
      params: {...params},
  });
}

export async function getCards(params) {
  let url = CONFIG.SEARCH_CARDS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function getCard(params) {
  // console.info(params)
  let url = CONFIG.SEARCH_CARD;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function getMembers(params) {
  let url = CONFIG.GET_MEMBERS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function switchState(params) {
  let url = CONFIG.SWITCH_STATE;
  return post(url, {
      params: {...params},
  });
}

export async function showCardDetail(params) {
  let url = CONFIG.SHOW_DETAIL;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

// case管理 CaseManage
export async function searchCases(params) {
  // 查询cases
  let url = CONFIG.SEARCH_CASE;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function exportFiledCase(params) {
  // 查询cases
  let url = CONFIG.EXPORT_FILED_CASE;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function uploadExcelData(params) {
  let url = CONFIG.UPLOAD_EXCEL;
  return post(url, {
      params: {...params},
  });
}

export async function updateCase(params) {
  let url = CONFIG.UPDATE_CASE;
  return post(url, {
      params: {...params},
  });
}

export async function fileCase(params) {
  let url = CONFIG.FILE_CASE;
  return post(url, {
      params: {...params},
  });
}

// 成员管理 MemberManage
export async function searchMembers(params) {
  let url = CONFIG.SEARCH_MEMBER;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function addMember(params) {
  let url = CONFIG.ADD_MEMBER;
  return post(url, {
      params: {...params},
  });
}

export async function getMember(params) {
  let url = CONFIG.GET_MEMBER;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function updateMember(params) {
  let url = CONFIG.UPDATE_MEMBER;
  return post(url, {
      params: {...params},
  });
}

export async function deleteMember(params) {
  let url = CONFIG.DELETE_MEMBER;
  return post(url, {
      params: {...params},
  });
}

// 自动化 Automation
export async function listTags(params) {
  let url = CONFIG.LIST_TAGS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function showCases(params) {
  console.log("r:", params)
  let url = CONFIG.SHOW_CASES;
  return post(url, {
      params: {...params},
  });
}

//  Board
export async function board(params) {
  let url = CONFIG.BOARD_CARDS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function getSprints(params) {
  let url = CONFIG.GET_SPRINTS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function openCard(params) {
  let url = CONFIG.OPEN_CARD;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function selectMembers(params) {
  let url = CONFIG.SELECT_MEMBER;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function sendNotificationByWechat(params) {
  let url = CONFIG.SEND_WECHAT;
  return post(url, {
      params: {...params},
  });
}

export async function switchStep(params) {
  let url = CONFIG.SWITCH_STEP;
  return post(url, {
      params: {...params},
  });
}

export async function displayLog(params) {
  let url = CONFIG.OPERATE_LOG;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function updateCard(params) {
  let url = CONFIG.UPDATE_CARD;
  return post(url, {
      params: {...params},
  });
}

export async function createCard(params) {
  let url = CONFIG.CREATE_CARD;
  return post(url, {
      params: {...params},
  });
}

export async function createSprint(params) {
  let url = CONFIG.CREATE_SPRINT;
  return post(url, {
      params: {...params},
  });
}

export async function judgeSprintName(params) {
  let url = CONFIG.JUDGE_SPRINT;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function judgeCardIndex(params) {
  let url = CONFIG.JUDGE_INDEX;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

// dashboard
export async function basicData(params) {
  let url = CONFIG.DASHBOARD_BASIC;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function memberPointChart(params) {
  let url = CONFIG.MEMBER_POINT_CHART;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function cardPointChart(params) {
  let url = CONFIG.CARD_POINT_CHART;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function trendDataChart(params) {
  let url = CONFIG.TREND_DATA_CHART;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function burnDownChart(params) {
  let url = CONFIG.BURNDOWN_CHART;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function sumFlowChart(params) {
  let url = CONFIG.FLOW_CHART;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

// config
export async function getProjects(params) {
  let url = CONFIG.GET_PROJECTS;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function getProjectConfig(params) {
  let url = CONFIG.GET_CONFIG;
  return request(url, {
    method: 'GET',
    params: {...params},
  });
}

export async function createProject(params) {
  let url = CONFIG.CREATE_PROJECT;
  return post(url, {
      params: {...params},
  });
}

export async function updateProject(params) {
  let url = CONFIG.UPDATE_PROJECT;
  return post(url, {
      params: {...params},
  });
}