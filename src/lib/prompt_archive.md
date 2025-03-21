# Prompt Archive

## Version 1.0 (March 19, 2024)
```typescript
const prompt = `Generate a fully formatted Word document (.docx) containing a **customized worksheet** for a **${age}-year-old student** named **${profile.name}**. The worksheet should be engaging, age-appropriate, and aligned with **the US curriculum** for ${gradeLevel}.

---
## **Word Document Structure**  
The generated Word document must be structured as follows:

### **1. Worksheet Section (Main Content)**
   - **Title** at the top: Include the student's name, subject, and a blank space for the date.  
   - **Introduction & Instructions:** A short, encouraging introduction with clear instructions for completing the worksheet.  
   - **EXACTLY 20 Questions**, structured as follows:
     - **8 multiple-choice questions** (covering fundamental concepts).  
     - **6 short-answer questions** (requiring brief explanations, calculations, or analysis).  
     - **4 problem-solving questions** (requiring multi-step solutions and real-world application).  
     - **2 creative thinking questions** (to encourage deeper critical thinking and imagination).  
   - **Number all questions clearly from 1 to 20**.  
   - **Provide enough space for the student to write answers**:
     - Multiple choice: 2 lines  
     - Short answer: 4-5 lines  
     - Problem-solving: 8-10 lines  
     - Creative thinking: 10-12 lines  
   - **Ensure progressive difficulty** (start with simple questions and gradually introduce more challenging ones).  
   - **Use the student's interests (${profile.interests})** to craft relevant and fun scenarios in the questions.  
   - **Include real-world application** to make learning meaningful (e.g., if the student loves soccer, frame math problems around goal statistics).  
   - **Add at least one brain teaser, puzzle, or logic-based challenge** to develop analytical thinking.  
   - **If applicable, describe visuals, diagrams, or hands-on activities** (e.g., "Label the diagram," or "Sketch your answer").  
   - **Ensure all content aligns with the student's US grade-level curriculum.**  

### **📌 Subject-Specific Enhancements**  
If the selected subject is **ELA (English Language Arts)**, modify the structure as follows:
  - **Include one reading comprehension passage** with at least **3 related questions**.  
  - **Incorporate grammar and vocabulary exercises** relevant to ${gradeLevel}.  
  - **Add at least one writing prompt** (e.g., creative writing or analytical response).  
  - **Introduce a word puzzle or vocabulary-building activity**.  
  - **Ensure questions cover comprehension, critical thinking, grammar, and word usage.**  

### **2. Answer Sheet (Separate Section on a New Page)**  
   - **Leave at least ONE full blank page after the last question** before starting the answer sheet.  
   - **Clearly label the section as 'Answer Sheet'** and ensure it starts on a **new page**.  
   - **Provide complete answers** for all 20 questions.  
   - **Step-by-step explanations** for problem-solving and short-answer questions.  
   - **Break down complex answers into simpler steps** so parents can understand the reasoning.  
   - **For creative thinking questions, include a rubric or key points** that parents can use for evaluation.  
   - **Helpful tips for parents or teachers** on how to explain challenging concepts or encourage the student's problem-solving approach.  

---
## **Engagement & Cognitive Development Strategies**
1. **Balanced Questioning:** Ensure a mix of easy, moderate, and challenging questions.  
2. **Gamification Elements:** Consider a storytelling or mission-based approach where each question builds on a theme.  
3. **Critical Thinking Development:** Include logic-based puzzles, pattern recognition, and mini-case studies.  
4. **Visual & Interactive Learning:** Describe diagrams, charts, or experiments where applicable.  
5. **Skill Progression & Motivation:** Start with confidence-building questions and end with a rewarding challenge.  

---
## **Formatting Requirements**
- The worksheet and answer sheet **must be formatted for easy printing**.  
- **Start each new section on a new page** for clarity.  
- **Use clear fonts and spacing** to ensure readability.  
- **Include a footer with page numbers**.  

---
## **Final Output Requirements**
- The final document should be a **fully formatted Word document (.docx)**, **not PDF or other formats**.  
- The worksheet should be **engaging, educational, and aligned with the US curriculum**.  
- The answer sheet should be **thorough and helpful for parents/teachers to review**.  
- The overall worksheet should **make learning fun, interactive, and challenging while reinforcing key skills**.`;
``` 