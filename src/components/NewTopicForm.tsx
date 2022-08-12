import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { addTopic } from "../features/topics/topicsSlice";
import ROUTES from "../app/routes";
import * as icons from "../data/icons";

export default function NewTopicForm() {
  const allIcons = icons.ALL_ICONS as AllIcons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      topicName: "",
      topicIcon: "default"
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data, e) => {
    e?.preventDefault();
    const topicId = uuidv4();

    dispatch(
      addTopic({
        id: topicId,
        name: data.topicName,
        icon: allIcons[data.topicIcon].url,
        quizIds: []
      })
    );
    navigate(ROUTES.topicsRoute());
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="center">Create a new topic</h1>
        <div className="form-section">
          <div className="form-field">
            <input
              {...register("topicName", {
                required: true,
                minLength: 1
              })}
              type="text"
              placeholder="Topic Name"
              className={errors.topicName?.type === "required" ? "invalid" : ""}
            />
            {errors.topicName?.type === "required" && (
              <p className="error-message">Topic Name is required</p>
            )}
          </div>
          <div className="form-field">
            <select
              {...register("topicIcon", {
                required: true,
                validate: (value) =>
                  Object.keys(allIcons).includes(value) || "Icon is required"
              })}
              className={errors.topicIcon?.type === "validate" ? "invalid" : ""}
            >
              <option value="default" disabled hidden>
                Choose an icon
              </option>
              {Object.entries(allIcons).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>
            {errors.topicIcon?.type === "validate" && (
              <p className="error-message">{errors.topicIcon.message}</p>
            )}
          </div>
        </div>
        <button className="center">Add Topic</button>
      </form>
    </section>
  );
}

interface FormValues {
  topicName: string;
  topicIcon: icons.IconsKeyType | "default";
}
