import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Contact.css";
import {Helmet} from "react-helmet-async";

const Contact = ({ user }) => {
  const { t } = useTranslation();
  const travelTypes = t("contact.travelTypes", { returnObjects: true }) || [];
  const destinations = t("contact.destinations", { returnObjects: true }) || [];
  const formRef = useRef(null);  // 添加 ref
  const [isLoading, setIsLoading] = useState(false);

  const getDateString = (daysFromToday = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      email: "",
      travelType: "",
      destination: [],
      startDate: getDateString(3),
      endDate: getDateString(4),
      number_of_people: "",
      budget: "",
    },
    shouldFocusError: true
  });

  useEffect(() => {
    if (user) {
      const userName = `${user.first_name} ${user.last_name}`;
      reset({
        title: user.title || "",
        name: userName,
        email: user.email || "",
        travelType: "",
        destination: [],
        startDate: getDateString(3),
        endDate: getDateString(4),
        number_of_people: "",
        budget: "",
      });
    }
  }, [user, reset]);

  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);  // 新增：追踪是否提交成功
  const navigate = useNavigate();

  const [otherDestination, setOtherDestination] = useState("");
  const selectedDestinations = watch("destination", []);
  const isOtherSelected = selectedDestinations.includes("Other");

  // 滚动到顶部的函数
  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = async(data) => {
    scrollToTop();
    setIsLoading(true);

    let filteredDestinations = data.destination.filter((dest) => dest !=="Other");

    if (isOtherSelected && otherDestination) {
      filteredDestinations.push(otherDestination);
    }
    data.destination = filteredDestinations;

    try {
      const response = await fetch("https://rhinecustom.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitMessage(t("contact.submitSuccess"));
        setSubmitStatus("success");
        setIsSubmitted(true);  // 设置提交成功状态
        reset();
        setOtherDestination("");
        scrollToTop();  // 滚动到顶部
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('后端错误详情:', errorData);

        setSubmitMessage(t("contact.submitFail"));
        setSubmitStatus("warning");
        scrollToTop();  // 滚动到顶部
      }
    } catch(error) {
      setSubmitMessage(t("contact.submitFail"));
      setSubmitStatus("warning");
      scrollToTop();  // 滚动到顶部
    } finally {
      setIsLoading(false);  // 结束加载
    }
  };

  return (
      <>
        <Helmet>
          <title>联系我们 - Rhine Custom</title>
          <meta name="description" content="联系 Rhine Custom/莱茵定制 团队，我们随时为您提供帮助" />
          <link rel="canonical" href="https://www.rhinecustom.com/contact" />
        </Helmet>
        {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
        )}
        <div ref={formRef} className="container p-4">
          {submitMessage && (
              <div className={`alert alert-${submitStatus}`}>
                {submitMessage}
              </div>
          )}

          {/* 只有未成功提交时才显示表单 */}
          {!isSubmitted && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="mb-3">{t("contact.formIntro")}</p>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.titleLabel")}</label>
                  <select
                      {...register("title", { required: t("contact.errorTitleRequired") })}
                      className="form-select"
                  >
                    <option value="" disabled>{t("contact.titlePlaceholder")}</option>
                    <option value="mr">{t("contact.titleMr")}</option>
                    <option value="ms">{t("contact.titleMs")}</option>
                    <option value="mx">{t("contact.titleMx")}</option>
                  </select>
                  {errors.title && <p className="alert alert-warning mt-2">{errors.title.message}</p>}
                </div>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.nameLabel")}</label>
                  <input
                      {...register("name", { required: t("contact.errorNameRequired") })}
                      className="form-control"
                      placeholder={t("contact.namePlaceholder")}
                  />
                  {errors.name && <p className="alert alert-warning mt-2">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.emailLabel")}</label>
                  <input
                      {...register("email", {
                        required: t("contact.errorEmailRequired"),
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: t("contact.errorEmailFormat")
                        }
                      })}
                      className="form-control"
                      placeholder={t("contact.emailPlaceholder")}
                  />
                  {errors.email && <p className="alert alert-warning mt-2">{errors.email.message}</p>}
                </div>

                {/* Travel Type */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.travelTypeLabel")}</label>
                  <Controller
                      name="travelType"
                      control={control}
                      rules={{ required: t("contact.errorTravelTypeRequired") }}
                      render={({ field }) => (
                          <Select
                              {...field}
                              options={travelTypes}
                              placeholder = {t("contact.select")}
                              value={travelTypes.find((option) => option.value === field.value) || null}
                              onChange={(selected) => field.onChange(selected.value)}
                          />
                      )}
                  />
                  {errors.travelType && <p className="alert alert-warning mt-2">{errors.travelType.message}</p>}
                </div>

                {/* Destination */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.destinationLabel")}</label>
                  <Controller
                      name="destination"
                      control={control}
                      rules={{ required: t("contact.errorDestinationRequired") }}
                      render={({ field }) => (
                          <Select
                              options={destinations}
                              placeholder = {t("contact.select")}
                              isMulti
                              value={destinations.filter((opt) =>
                                  field.value?.includes(opt.value)
                              )}
                              onChange={(selectedOptions) => {
                                if (!selectedOptions) {
                                  field.onChange([]);
                                } else {
                                  const values = selectedOptions.map((opt) => opt.value);
                                  field.onChange(values);
                                }
                              }}
                          />
                      )}
                  />
                  {errors.destination && <p className="alert alert-warning mt-2">{errors.destination.message}</p>}
                </div>

                {/* Other Destination */}
                {isOtherSelected && (
                    <div className="mb-3">
                      <label className="form-label">{t("contact.otherDestinationLabel")}</label>
                      <input
                          type="text"
                          className="form-control"
                          placeholder={t("contact.otherDestinationPlaceholder")}
                          value={otherDestination}
                          onChange={(e) => setOtherDestination(e.target.value)}
                      />
                    </div>
                )}

                {/* Start Date */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.startDateLabel")}</label>
                  <input
                      {...register("startDate", {
                        required: t("contact.errorStartDateRequired"),
                        validate: (value) => {
                          const selectedDate = new Date(value);
                          const afterOneWeek = new Date();
                          afterOneWeek.setDate(afterOneWeek.getDate() + 3);
                          afterOneWeek.setHours(0, 0, 0, 0);
                          return selectedDate >= afterOneWeek || t('general-string.errorTooEarly');
                        }
                      })}
                      type="date"
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.startDate && <p className="alert alert-warning mt-2">{errors.startDate.message}</p>}
                </div>

                {/* End Date */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.endDateLabel")}</label>
                  <input
                      {...register("endDate", {
                        required: t("contact.errorEndDateRequired"),
                        validate: (value) => {
                          const startDate = watch("startDate");
                          if (!startDate) return true;
                          return new Date(value) > new Date(startDate) || t("contact.errorEndDateMustBeAfterStart")
                        }
                      })}
                      type="date"
                      className="form-control"
                      min={watch("startDate") || new Date().toISOString().split('T')[0]}
                  />
                  {errors.endDate && <p className="alert alert-warning mt-2">{errors.endDate.message}</p>}
                </div>

                {/* Number of Travelers */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.numberOfTravelersLabel")}</label>
                  <input
                      {...register("number_of_people", {
                        required: t("contact.errorNumberRequired"),
                        min: {
                          value: 1,
                          message: t("contact.errorNumberMinLength")
                        }
                      })}
                      type="number"
                      className="form-control"
                      min="1"
                      step="1"
                  />
                  {errors.number_of_people && <p className="alert alert-warning mt-2">{errors.number_of_people.message}</p>}
                </div>

                {/* Budget */}
                <div className="mb-3">
                  <label className="form-label">{t("contact.budgetLabel")}</label>
                  <div className="input-group">
                    <span className="input-group-text">¥</span>
                    <input
                        {...register("budget", {
                          required: t("contact.errorBudgetRequired"),
                          min: {
                            value: 1,
                            message: t("contact.errorBudgetMin")
                          }
                        })}
                        type="number"
                        className="form-control"
                        min="1"
                        step="1"
                    />
                  </div>
                  {errors.budget && <p className="alert alert-warning mt-2">{errors.budget.message}</p>}
                </div>

                <button type="submit" className="button w-100">{t('general-strings.submit')}</button>
              </form>
          )}
        </div>
      </>
  );
};

export default Contact;