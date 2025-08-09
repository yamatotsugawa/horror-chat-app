import ClientChooser from "../components/ClientChooser";
import { HORROR_CHARACTERS, DEFAULT_CHARACTER_ID } from "../data/horrorCharacters";

export default function Page() {
  return (
    <main className="container">
      <header className="header">
        <h1>相談しちゃいけない人に相談する</h1>
        <p className="lead">下のキャラクターを選んでください。</p>
      </header>

      <ClientChooser characters={HORROR_CHARACTERS} defaultId={DEFAULT_CHARACTER_ID} />

      <footer className="footer">
        <small>© Horror Chat Portal</small>
      </footer>
    </main>
  );
}
