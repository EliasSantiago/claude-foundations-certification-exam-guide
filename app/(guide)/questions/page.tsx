import { PageHeader, PageNav } from "@/components/PageShell";
import Quiz from "@/components/Quiz";

export const metadata = { title: "Practice Questions · Foundations Guide" };

export default function QuestionsPage() {
  return (
    <div className="prose-guide">
      <PageHeader
        eyebrow="Practice"
        title="Sample questions"
        intro="Twelve sample questions in the exam's format — one correct answer of four. Pick an option, check it, and read the explanation. Your running score appears at the top."
      />
      <Quiz />
      <PageNav current="/questions" />
    </div>
  );
}
