class UserInfo {
  constructor(nameSelector, infoSelector, avatarId) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.getElementById(avatarId);
  }
  getUserInfo(data) {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  setUserAvatar({ avatar }) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

  setUserInfo({ name, info, id }) {
    this._name.textContent = name;
    this._info.textContent = info;

    this._id = id;
  }
}

export default UserInfo;
