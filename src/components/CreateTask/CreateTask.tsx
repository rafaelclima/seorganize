import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./CreateTask.module.css";
import { BadgePlus, ClipboardList } from "lucide-react";
import { TaskCard } from "../TaskCard/TaskCard";

interface CreateTaskProp {
  id: number;
  content: string;
}

export function CreateTask() {
  const [taskContent, setTaskContent] = useState("");
  const [newTask, setNewTask] = useState<CreateTaskProp[]>([]);
  const [id, setId] = useState(1);
  const [createdTask, setCreatedTask] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(0);

  function handleNewTaskChangeText(ev: ChangeEvent<HTMLInputElement>) {
    setTaskContent(ev.target.value);
  }

  function handleCreateNewTask(ev: FormEvent) {
    ev.preventDefault();

    const creatingTask = {
      id: id,
      content: taskContent,
    };
    setNewTask([...newTask, creatingTask]);

    setId((prev) => (prev += 1));
    setCreatedTask((prev) => prev + 1);
    setTaskContent("");
  }

  function handleDeleteTask(cardId: number, completed: boolean) {
    const deletingTask = newTask.filter((task) => task.id != cardId);
    setNewTask(deletingTask);
    setCreatedTask((prev) => prev - 1);

    if (taskCompleted !== 0 && completed) {
      setTaskCompleted((prev) => prev - 1);
    }
  }

  function handleCompletedTask(taskCompleteOrNot: boolean) {
    if (taskCompleteOrNot) {
      setTaskCompleted((prev) => prev + 1);
    } else {
      setTaskCompleted((prev) => prev - 1);
    }
  }

  const isNewTaskTextEmpty = taskContent === "";

  return (
    <>
      <form className={styles.taskForm}>
        <input
          type="text"
          name="newTask"
          id="newTask"
          placeholder="Adicione uma nova tarefa"
          value={taskContent}
          onChange={handleNewTaskChangeText}
        />

        <button
          onClick={handleCreateNewTask}
          disabled={isNewTaskTextEmpty}
          className={styles["custom-button"]}
        >
          Criar <BadgePlus size={16} strokeWidth={1.5} />
          {isNewTaskTextEmpty && (
            <span className={styles.tooltip}>Digite uma tarefa</span>
          )}
        </button>
      </form>

      <main className={styles.tasks}>
        <header>
          <div className={styles.headerTaskCounter}>
            <p>
              Tarefas criadas <span>{createdTask}</span>
            </p>
          </div>

          <div className={styles.headerTaskCounter}>
            <p>
              Concluídas <span>{taskCompleted}</span>
            </p>
          </div>
        </header>

        {newTask.length === 0 ? (
          <section className={styles.whitoutTasks}>
            <div className={styles["whitoutTasks-content"]}>
              <ClipboardList size={56} strokeWidth={0.5} />
              <div>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>

            <div></div>
          </section>
        ) : (
          newTask.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              content={task.content}
              onDeleteTask={handleDeleteTask}
              onCompleteTask={handleCompletedTask}
            />
          ))
        )}
      </main>
    </>
  );
}
