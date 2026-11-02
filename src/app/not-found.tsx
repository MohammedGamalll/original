import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="section-space">
      <p className="text-sm text-ink/80">٤٠٤</p>
      <h1 className="mt-4 font-display text-5xl font-semibold">الصفحة غير موجودة</h1>
      <p className="mt-4 max-w-md text-lg leading-9 text-ink/80">
        الرابط لا يطابق صفحة في الموقع. يمكن العودة إلى الرئيسية أو معرض الأعمال.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">الرئيسية</Button>
        <Button href="/projects/" variant="secondary">
          الأعمال
        </Button>
      </div>
    </Container>
  );
}
