import { Trash2 } from "lucide-react";
import styles from "./TaskCard.module.css";
import { useState } from "react";

interface TaskCardProps {
  id: number;
  content: string;
  onDeleteTask: (taskId: number, completed: boolean) => void;
  onCompleteTask: (complete: boolean) => void;
}

export function TaskCard({
  id,
  content,
  onDeleteTask,
  onCompleteTask,
}: TaskCardProps) {
  const [cardCheck, setCardCheck] = useState(false);

  const handleDeleteTask = () => {
    onDeleteTask(id, cardCheck);
  };

  function handleChangeTask() {
    setCardCheck(!cardCheck);
    onCompleteTask(!cardCheck);
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardText}>
        <label htmlFor="statusTask"></label>
        <input
          type="checkbox"
          name="statusTask"
          id="statusTask"
          onChange={handleChangeTask}
          checked={cardCheck}
        ></input>
        <p>{content}</p>
      </div>
      <div className={styles.cardButtonDelete}>
        <Trash2 onClick={handleDeleteTask} strokeWidth={1.25} size={18} />
      </div>
    </article>
  );
}
