import { Accordion } from "./components/accordion";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Accordion
        title="Возведение стен и перегородок из листовых материалов"
        body=""
      >
        <Accordion title="Возведение перегордок из гипсокартона"></Accordion>
      </Accordion>
    </main>
  );
}
