class UserInfo {
  constructor(nameSelector, infoSelector, avatarId) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.getElementById(avatarId);
  }
  getUserInfo(data) {
    return {
      info: data.about,
      avatar: data.avatar,
      cohort: data.cohort,
      name: data.name,
      id: data._id,
    };
  }
  setUserInfo({ name, info, avatar }) {
    this._name.textContent = name;
    this._info.textContent = info;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}

export default UserInfo;
