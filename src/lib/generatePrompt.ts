interface Profile {
  name: string;
  age: string;
  interests: string;
  subjects: string[];
  gender: string;
}

export function generateCustomPrompt(profile: Profile): string {
  const age = parseInt(profile.age);
  const gradeLevel = age >= 18 ? 'college' : 
                     age >= 14 ? 'high school' : 
                     age >= 11 ? 'middle school' : 'elementary school';
  
  const difficultyLevel = age >= 18 ? 'advanced' : 
                         age >= 14 ? 'intermediate' : 
                         age >= 11 ? 'beginner-intermediate' : 'beginner';
  
  const pronoun = profile.gender === 'Female' ? 'she' : 
                  profile.gender === 'Male' ? 'he' : 'they';
  const possessivePronoun = profile.gender === 'Female' ? 'her' : 
                           profile.gender === 'Male' ? 'his' : 'their';

  const prompt = `You are a worksheet generation assistant. Your task is to create a **fully formatted, downloadable HTML document** that contains a personalized, age-appropriate, US curriculum-aligned worksheet for a student.

## 🔹 STUDENT PROFILE
- Name: ${profile.name}
- Age: ${age}
- Grade Level: ${gradeLevel} (US-based)
- Interests: ${profile.interests} (e.g., soccer, Rubik's Cube, chess)
- Preferred Learning Style: Logical thinking, hands-on problem solving, visual learning
- Selected Subject: ${profile.subjects.join(', ')}

## 🔹 GOAL
Generate a printable HTML worksheet that:
- Engages the student through personalized, meaningful content
- Uses the student's interests in questions and story framing
- Aligns with grade-appropriate standards for the US curriculum
- Balances fun, education, and progression
- Can be saved or downloaded as an \`.html\` file directly by a parent or teacher

---

## 🧠 CONTENT STRUCTURE & QUESTION COUNT
Dynamically adjust question count per section based on complexity to stay **within ~3,500 tokens total**:

${profile.subjects.map(subject => {
  switch(subject) {
    case 'Math':
      return `### 1. 🔢 MATH (25–30 Questions)
- Simple arithmetic, multi-step word problems
- Include real-life logic using student interests (e.g., goals scored in soccer)
- Include counting, patterns, basic multiplication/division`;
    case 'Science':
      return `### 2. 🧪 SCIENCE (20–25 Questions)
- Body parts, planets, motion, gravity, force
- Light experiments, water cycle, life science basics
- Focus on observations and reasoning`;
    case 'ELA':
      return `### 3. 📖 ENGLISH LANGUAGE ARTS (20–25 Questions)
- Vocabulary, fill-in-the-blank, sentence corrections
- Grammar exercises
- Include a short reading passage + 3 comprehension questions
- At least 1 creative writing prompt`;
    case 'Social':
      return `### 4. 🌍 SOCIAL STUDIES (20–25 Questions)
- History, geography, and cultural awareness
- Current events and community studies
- Map reading and historical timelines
- Cultural diversity and global perspectives`;
    default:
      return '';
  }
}).join('\n\n')}

### 5. 🧠 LOGIC & PUZZLES (10–15 Questions)
- Analogies, pattern recognition, odd-one-out, riddles
- Simple logic problems involving numbers or visual sequences

### 6. 🎨 CREATIVE WRITING (5–10 Prompts)
- Open-ended, imagination-based story starters
- "What if" scenarios related to student interests
- Drawing-based description prompts (e.g., design a team logo and explain it)

---

## 🎨 FORMATTING REQUIREMENTS
- Return **a complete HTML file**, not a code block or Markdown
- Include:
  - \`<html>\`, \`<head>\`, and \`<body>\` tags
  - A \`<style>\` section with:
    - Clean, kid-friendly layout
    - Padding, colors, readable fonts
    - Styled question blocks (e.g., \`.question {}\` class)
- Use **emoji-based section headers** for visual clarity (e.g., \`🔢 Math Challenges\`, \`🧠 Logic Time\`)
- Each question must be inside:
  \`\`\`html
  <div class="question">🔢 1️⃣ What is 5 + 3?</div>
  \`\`\``;

  return prompt;
} 