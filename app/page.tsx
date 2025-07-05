import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/text-to-speech">Text to Speech</Link>
      <br></br>
      <Link href="/speech-to-text">Speech to Text</Link>
      <br></br>
      <Link href="/both">Both</Link>
    </div>
  );
}
