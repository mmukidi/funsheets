interface Profile {
  name: string;
  age: number;
  interests: string;
  subjects: string[];
  gender: string;
}

export function generateCustomPrompt(profile: Profile, subject: string): string {
  const gradeLevel = profile.age >= 15 ? 'High School' :
                     profile.age >= 12 ? 'Middle School' :
                     profile.age >= 9 ? '4th-5th Grade' :
                     profile.age >= 7 ? '2nd-3rd Grade' :
                     '1st Grade';

  const difficultyLevel = profile.age >= 15 ? 'advanced' :
                          profile.age >= 12 ? 'intermediate' :
                          'basic';

  const pronoun = profile.gender.toLowerCase() === 'male' ? 'he' : 'she';
  const possessivePronoun = profile.gender.toLowerCase() === 'male' ? 'his' : 'her';

  return `Generate a customized ${subject} worksheet for a ${profile.age}-year-old student (${gradeLevel}) named ${profile.name}. The worksheet should be engaging, age-appropriate, and aligned with the US curriculum for this grade level.

Include a variety of question types (e.g. multiple-choice, short answer, matching, and an open-ended problem-solving question) to ensure balanced questioning. Make sure some questions involve analytical reasoning or real-world scenarios.

The content and difficulty of the questions should reflect what a student of this age is learning in ${subject} class (for example, include topics and skills that are typical according to state standards or Common Core for this grade). Start with easier questions to build confidence and then gradually increase the difficulty for a proper skill progression. Provide any necessary instructions or examples for harder problems to help the student along.

Integrate the student's interests and hobbies (${profile.interests}) into the worksheet to boost engagement. Use a fun, storytelling approach or a unifying theme throughout the worksheet so that it feels like a cohesive activity rather than a random list of questions. You can even set up a scenario or a mission (e.g., a story of a hero, a mystery to solve, or a game level to beat) that progresses with each question, making the student feel immersed in a narrative or game.

Add at least one puzzle or brain teaser related to ${subject} to promote cognitive development and critical thinking (for example, a simple logic puzzle, riddle, or pattern to complete that ties into the subject). Also include one or two fun elements such as a riddle, joke, or creative prompt to keep it enjoyable. Ensure there's an opportunity for the student to be creative or think outside the box (such as a question asking "What do you think about...?" or "Imagine and describe...").

Where appropriate, incorporate visuals or interactive components: mention or include a diagram, image, or chart that the student can refer to or label. If an actual image can't be included in the generated output, describe what image or diagram could be used. You can also suggest a simple hands-on activity within the worksheet (e.g., "Try this at home: ...") to make it interactive.

The tone of the worksheet should be encouraging and fun. Start with a personalized greeting or a short introduction addressing ${profile.name} to make it friendly. Use clear, age-appropriate language in both questions and instructions. Organize the worksheet with sections or headings if needed (for example, "Part 1: Basics," "Part 2: Challenge Questions," "Bonus Puzzle," etc.) so it's well-structured and easy to follow.

Finally, output should be in word document format (docx). This means using a clean layout: include a title for the worksheet, number the questions or tasks, and ensure each question is separated by some space for the student's answers. If there are multiple sections, clearly label them. The end result should be a fun, educational, and challenging worksheet that helps reinforce learning and spark the student's curiosity in ${subject}.

Answer Sheet Section (Separate Page)

Create separate page(s) at the end of the document containing a detailed answer sheet for parents to review:

    Correct answers for all questions
    Step-by-step explanations or reasoning for complex problems (e.g., for math, show how to solve; for reading comprehension, explain the key points).
    Hints or alternative solutions where applicable to help parents guide their child's learning.
    Encouraging Feedback: Include short motivational tips or reinforcement suggestions (e.g., "Great effort! If you struggled with Question 5, try breaking it into smaller steps.").`;
} 