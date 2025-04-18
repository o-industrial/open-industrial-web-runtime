export default function HeroSection() {
  return (
    <section class='relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-[#0A1F44] to-[#0E2A5A]'>
      <h1 class='text-4xl font-extrabold text-neon-blue drop-shadow-lg'>
        Innovating Industrial AI Execution—Insights from Industry Leaders
      </h1>
      <p class='mt-4 text-lg text-gray-300 max-w-2xl'>
        Open Industrial’s Thought Leadership Hub features cutting-edge research, expert analysis, and
        advancements in industrial AI execution.
      </p>
      <div class='mt-6 flex space-x-4'>
        <a
          href='/industry-research'
          class='px-6 py-3 bg-neon-blue text-white font-semibold rounded-lg shadow-md hover:bg-neon-green transition duration-300'
        >
          Explore AI Execution Insights
        </a>
        <a
          href='/community'
          class='px-6 py-3 border border-neon-blue text-neon-blue font-semibold rounded-lg shadow-md hover:border-neon-green hover:text-neon-green transition duration-300'
        >
          Join the AI Execution Community
        </a>
      </div>
    </section>
  );
}
