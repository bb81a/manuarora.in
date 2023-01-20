import Container from "@/components/Container";
import Tweet from "@/components/Tweet";
import { getTweets } from "@/lib/twitter";
import prisma from "lib/prisma";

export default function Tweets({ tweets }) {
  return (
    <Container
      title="Tweets – Manu Arora"
      description="A collection of tweets that make me laugh, make me think and make me learn."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Tweets
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          A collection of my favourite tweets. Might have some tech and design
          knowledge.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Also, not to forget, built using the Twitter API V2 (Super easy, super
          fun). 🕊
        </p>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const entries = await prisma.tweets.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  const fallbackTweetIds = [
    "1487444357980762114",
    "1601209526249586688",
    "1601230902734254080",
    "1600885184408309765",
    "1593940652936527876",
    "1215673997725196288",
    "1589558362022240257",
    "1588397944331722752",
    "1440792546955825154",
  ];

  let twts =
    entries.length > 0
      ? entries.map((entry) => entry.tweetId)
      : fallbackTweetIds;

  const tweets = await getTweets(twts);

  return {
    props: {
      tweets,
    },
    revalidate: 60,
  };
}
