import axios from 'axios';

const BASE_URL = '/api/groups/';

const fetchGroups = () => axios.get(BASE_URL);
const fetchGroup = (groupId, populate) => {
  return axios.post(`${BASE_URL}/view/${groupId}`, populate);
}
const createGroup = group => axios.post(BASE_URL, group);
const deleteGroup = groupId => axios.delete(`${BASE_URL}${groupId}`);
const updateGroup = (groupId, group) => axios.patch(`${BASE_URL}${groupId}`, group);

export default {
  fetchGroup,
  fetchGroups,
  createGroup,
  deleteGroup,
  updateGroup
}