const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const user = await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin User",
        password: hashedPassword,
      },
    });
    console.log("Created user: ", user);
  } else {
    console.log("Admin user already exists, skipping creation.");
  }
  const existingPlayer1 = await prisma.player.findFirst({
    where: {
      name: "Jermaine Johnson",
      age: 24,
      position: "Defensive End",
    },
  });

  if (!existingPlayer1) {
    const player1 = await prisma.player.create({
      data: {
        name: "Jermaine Johnson",
        height: "6'5\"",
        age: 24,
        weight: 262,
        position: "Defensive End",
        photo: "jermaine_johnson_photo.jpg",
        playerInfo: "unavailable", 
      },
    });
    console.log("Created player 1: ", player1);
  } else {
    console.log("Player 1 (Jermaine Johnson) already exists, skipping creation.");
  }

  const existingPlayer2 = await prisma.player.findFirst({
    where: {
      name: "Lamar Jackson",
      age: 26,
      position: "Quarterback",
    },
  });

  if (!existingPlayer2) {
    const player2 = await prisma.player.create({
      data: {
        name: "Lamar Jackson",
        height: "6'2\"",
        age: 26,
        weight: 212,
        position: "Quarterback",
        photo: "lamar_jackson_photo.jpg",
        playerInfo: `
          Early Life and College Career

          Lamar Demeatrice Jackson Jr. was born on January 7, 1997, in Pompano Beach, Florida. From a young age, Jackson showed a passion and aptitude for football. His athleticism became evident in high school, where he excelled as a dual-threat quarterback at Boynton Beach High School in Boynton Beach, Florida. Jackson’s ability to dominate both in the passing game and on the ground attracted the attention of several college programs.

          Jackson chose to attend the University of Louisville, where he quickly became a standout player for the Cardinals. After showing promise in his freshman year (2015), he exploded onto the national scene as a sophomore in 2016, capturing the Heisman Trophy as the nation’s best player. That season, Jackson passed for 3,543 yards and 30 touchdowns while rushing for an incredible 1,571 yards and 21 touchdowns. His remarkable combination of speed, agility, and football IQ allowed him to break defenses in ways few quarterbacks had before. He finished his college career with a total of 9,043 passing yards, 69 passing touchdowns, and 50 rushing touchdowns.

          NFL Career
          Draft and Early Years

          Despite his stellar college career, many NFL teams doubted Jackson’s ability to transition to a traditional quarterback role in the NFL. Critics pointed to his unconventional passing mechanics and his reliance on his legs as reasons why he might struggle at the professional level. However, the Baltimore Ravens took a chance on him, selecting Jackson with the 32nd overall pick in the first round of the 2018 NFL Draft.

          Jackson's rookie season began with him backing up Joe Flacco, but after Flacco suffered a mid-season injury, Jackson took over as the starting quarterback in Week 11. His impact was immediate, leading the Ravens to a 6-1 record as a starter, and ultimately winning the AFC North division. Jackson’s dynamic rushing ability was at the forefront of Baltimore’s offense as he became the youngest quarterback to start a playoff game at the age of 21.

          Breakout MVP Season (2019)

          The 2019 season was a defining one for Lamar Jackson, as he transitioned from a promising talent to one of the league’s top superstars. Jackson led the Ravens to a league-best 14-2 record and earned the NFL MVP award, making him the second unanimous MVP in NFL history (after Tom Brady in 2010). Jackson’s statistics were eye-popping:

          Passing yards: 3,127
          Touchdowns: 36
          Interceptions: 6
          Rushing yards: 1,206 (an NFL record for a quarterback)
          Rushing touchdowns: 7
          Jackson's MVP season demonstrated that he could excel as a passer, finishing with a 66.1% completion rate while throwing the most touchdowns in the league. His electrifying style of play redefined the quarterback position, blending elite rushing with improved passing mechanics and decision-making.

          Football Analysis of Lamar Jackson

          Strengths:

          Unparalleled Athleticism and Rushing Ability: Lamar Jackson is arguably the best running quarterback in NFL history. His acceleration, agility, and vision allow him to turn broken plays into explosive gains. He has elite straight-line speed (having reportedly run a 4.34 40-yard dash) and the shiftiness of a running back. His rushing stats speak for themselves—he consistently ranks among the league leaders in rushing yards, not just among quarterbacks but among all players.
          Rushing Analysis: Jackson’s ability to make defenders miss in the open field is second to none. His lateral quickness and ability to change direction make him a nightmare for defenses. When running the read-option, Jackson is nearly impossible to defend because of his ability to keep defenses guessing. His vision allows him to find creases in the defense, and he is skilled at avoiding big hits to minimize injury risk, a key component for a running quarterback’s longevity.
          Improved Passing Mechanics: Coming into the league, many scouts doubted Jackson’s passing abilities, but he has shown consistent improvement. His arm strength is above average, allowing him to throw deep balls and zip passes into tight windows. Although his mechanics can sometimes falter under pressure, Jackson’s accuracy has notably improved, especially on short and intermediate throws. He has developed a better rapport with his receivers, particularly Mark Andrews and Marquise “Hollywood” Brown during his tenure with the Ravens.
          Passing Analysis: Jackson thrives in play-action situations, where his rushing threat forces linebackers and safeties to hesitate, opening up passing lanes downfield. He excels at throwing on the run, leveraging his mobility to extend plays and give receivers more time to get open. Jackson’s ability to process defenses has improved, though he still struggles against elite defensive schemes that force him into quick decisions under pressure.
          Football IQ and Leadership: Jackson has demonstrated a high football IQ, especially in his decision-making with the ball. He rarely makes reckless decisions, which is evidenced by his consistently low interception rates. Jackson also commands the respect of his teammates, and his leadership was a key factor in Baltimore’s transformation into a perennial playoff contender.
          Red Zone Efficiency: One of Jackson’s most underrated strengths is his ability to perform in the red zone. His dual-threat capabilities make the Ravens incredibly difficult to defend inside the 20-yard line. Defenses are forced to commit extra defenders to stop his running ability, which often leaves receivers open for easy scores. His compact throwing motion and quick release allow him to get the ball out quickly in tight spaces, making him an efficient passer in the red zone.
          Weaknesses:

          Passing Under Pressure: One of the main areas where Jackson still has room for improvement is his performance under pressure. Elite defenses have occasionally flustered him, particularly in high-stakes playoff games. Jackson sometimes holds onto the ball too long, leading to unnecessary sacks or hurried throws. While he has improved in this area, defenses that can collapse the pocket quickly can still disrupt his rhythm.
          Inconsistency in Deep Passing: Although Jackson has a strong arm, he is not consistently accurate on deep passes, particularly outside the numbers. His footwork can break down on long throws, and he sometimes relies too heavily on his arm strength without setting his feet properly. This has led to some underthrown or off-target deep passes that miss big-play opportunities.
          Playoff Performance: Despite his regular-season success, Jackson has struggled in the playoffs. As of the 2023 season, he has a 1-3 playoff record. Defenses have had more success game-planning for him in the postseason, often loading the box to stop his rushing and forcing him to beat them with his arm. Jackson's postseason struggles are not entirely on him, as Baltimore’s offense has lacked complementary pieces in certain years, but it remains an area where he faces significant scrutiny.
          Durability Concerns: While Jackson has avoided significant injury thus far in his career, his style of play naturally raises concerns about his long-term durability. Running quarterbacks are more susceptible to injuries, and Jackson takes more hits than most due to his frequent rushing attempts. The Ravens have taken steps to limit his exposure to big hits, but his reliance on mobility could become a concern as he ages.
          Conclusion

          Lamar Jackson is one of the most exciting and polarizing players in the NFL today. His ability to combine elite rushing talent with evolving passing skills has made him a generational talent and a game-changing player. While some questions about his postseason success and deep passing remain, Jackson’s ceiling is extraordinarily high. As long as the Ravens continue to build around him and refine their offensive system, Jackson has the potential to lead Baltimore to sustained success. His evolution from a college phenom to an NFL MVP demonstrates his work ethic and football IQ, and his unique skill set makes him a constant threat every time he 
        `.trim(), 
      },
    });
    console.log("Created player 2: ", player2);
  } else {
    console.log("Player 2 (Lamar Jackson) already exists, skipping creation.");
  }


  const existingPlayer3 = await prisma.player.findFirst({
    where: {
      name: "Jermaine Johnson",
      age: 25, 
      position: "Wide Receiver", 
    },
  });

  if (!existingPlayer3) {
    const player3 = await prisma.player.create({
      data: {
        name: "Jermaine Johnson",
        height: "6'0\"",
        age: 25,
        weight: 200,
        position: "Wide Receiver",
        photo: "jermaine_johnson_wr_photo.jpg",
        playerInfo: "unavailable",
      },
    });
    console.log("Created player 3 (different Jermaine Johnson): ", player3);
  } else {
    console.log("Player 3 (Jermaine Johnson, Wide Receiver) already exists, skipping creation.");
  }


  const teamsCount = await prisma.team.count();
  if (teamsCount === 0) {
    const teams = [
      'Arizona Cardinals',
      'Atlanta Falcons',
      'Baltimore Ravens',
      'Buffalo Bills',
      'Carolina Panthers',
      'Chicago Bears',
      'Cincinnati Bengals',
      'Cleveland Browns',
      'Dallas Cowboys',
      'Denver Broncos',
      'Detroit Lions',
      'Green Bay Packers',
      'Houston Texans',
      'Indianapolis Colts',
      'Jacksonville Jaguars',
      'Kansas City Chiefs',
      'Las Vegas Raiders',
      'Los Angeles Chargers',
      'Los Angeles Rams',
      'Miami Dolphins',
      'Minnesota Vikings',
      'New England Patriots',
      'New Orleans Saints',
      'New York Giants',
      'New York Jets',
      'Philadelphia Eagles',
      'Pittsburgh Steelers',
      'San Francisco 49ers',
      'Seattle Seahawks',
      'Tampa Bay Buccaneers',
      'Tennessee Titans',
      'Washington Commanders',
    ];

    // Seed all teams
    for (const team of teams) {
      await prisma.team.create({
        data: { name: team },
      });
    }
    console.log('Seeded teams');
  } else {
    console.log('Teams already seeded');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
