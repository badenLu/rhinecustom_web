import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/images/avatar/default_mr.png"; 
import "./ProfilePage.css";
import {useTranslation} from "react-i18next";

function ProfilePage({ user }) {
  // 如果 user 是从父组件传进来的，就先用它初始化编辑表单
  // 若要在这里自行获取，请在 useEffect 里 fetch 后端接口，再 setEditData
  const [editData, setEditData] = useState({
    title: user?.title || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    marketingEmails: user?.marketingEmails || false,
    birthday: user?.birthday || "",
    phone: user?.phone || "",
    region: user?.region || "",
  });

  // 头像预览与文件
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user.avatar : defaultAvatar
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const {t} = useTranslation();

  // 可选：若需要在此组件内自行获取用户最新信息
  /*
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEditData({
          title: data.title || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          marketingEmails: data.marketingEmails || false,
          birthday: data.birthday || "",
          phone: data.phone || "",
          region: data.region || "",
        });
        setAvatarPreview(data.avatar || defaultAvatar);
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, []);
  */

  // 处理输入框变化
  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 处理头像上传
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // 生成一个本地预览 URL
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // 保存更新
  {/*  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      // 用 FormData 打包要发送的字段
      const formDataToSend = new FormData();
      // 把 editData 中的字段都添加到 FormData
      Object.keys(editData).forEach((key) => {
        formDataToSend.append(key, editData[key]);
      });
      // 如果用户选择了新头像，添加到 FormData
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      }

      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "POST", // 或 PUT，看你后端接口定义
        headers: {
          Authorization: `Bearer ${token}`,
          // 注意：使用 FormData 时，通常不要手动设置 Content-Type
          // 它会自动设置为 multipart/form-data
        },
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        // 更新成功后，你可以选择：
        // 1. 再次 fetch 获取最新用户信息
        // 2. 给出提示 "更新成功"
        console.log("Profile updated successfully!");
        alert("个人信息更新成功！");
      } else {
        console.log("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }; */}

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/profile/update", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',           // 加上这行！
          'Content-Type': 'application/json',     // 加上这行！
        },
        body: JSON.stringify({
          title: editData.title,
          first_name: editData.first_name,
          last_name: editData.last_name,
          birthday: editData.birthday || null,
          phone: editData.phone || null,
          region: editData.region || null,
          marketingEmails: editData.marketingEmails,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile updated successfully!", data);
        alert("个人信息更新成功！");
      } else {
        console.log("Profile update failed:", data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page-container">
      <h2>{t('personalData.personalData')}</h2>

      {/* 头像区 */}
      <div className="profile-avatar-section">
        <img src={avatarPreview} alt="User Avatar" className="profile-avatar" />
        <div>
          <label htmlFor="avatarUpload" className="avatar-label">
            {t('personalData.uploadAvatar')}
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
      </div>

      {/* 信息表单 */}
      <div className="profile-form">
        <div className="form-group">
          <label>{t('register.title')}</label>
          <select
            name="title"
            value={editData.title}
            onChange={handleInputChange}
          >
            <option value="">{t('register.selectTitle')}</option>
            <option value="mr">{t('register.mr')}</option>
            <option value="ms">{t('register.ms')}</option>
            <option value="mx">{t('register.mx')}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t('personalData.firstName')}</label>
          <input
            type="text"
            name="first_name"
            value={editData.first_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>{t('personalData.lastName')}</label>
          <input
            type="text"
            name="last_name"
            value={editData.last_name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>{t('personalData.emailReadOnly')}</label>
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleInputChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="marketingEmails"
              checked={editData.marketingEmails}
              onChange={handleInputChange}
            />
            &nbsp;{t('personalData.marketing')}
          </label>
        </div>

        <div className="form-group">
          <label>{t('personalData.birthday')}</label>
          <input
            type="date"
            name="birthday"
            value={editData.birthday}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>{t('personalData.phone')}</label>
          <input
            type="text"
            name="phone"
            value={editData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>{t('personalData.region')}</label>
          <input
            type="text"
            name="region"
            value={editData.region}
            onChange={handleInputChange}
          />
        </div>

        <button className="save-btn" onClick={handleSave}>
          {t('personalData.save')}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
