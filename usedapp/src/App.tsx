import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import AppTabs from "./components/layout/AppTabs";

export default function App() {

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-800">
      <div className="flex flex-col gap-8">
        <Header />
        <Container>
          <>
            <AppTabs />
          </>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
