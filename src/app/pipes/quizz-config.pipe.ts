import { Pipe, PipeTransform } from '@angular/core';
import { FieldConfig } from '../dynamic-forms/models';
import { Question } from '../quizzes/models';

@Pipe({
    name: 'quizzConfig'
})
export class QuizzConfigPipe implements PipeTransform {

    transform(questions: Array<Question>): any {
        const config: Array<FieldConfig> = [];
        let index = 1;

        questions.forEach(question => {
            const variants = [];
            if (question) {
                if (question.answerVariants) {
                    question.answerVariants.forEach(variant => variants.push(variant.answer));
                }
                config.push({
                    name: `answer${index}`,
                    label: question.question,
                    type: question.questionType === 'input' ? 'input' : 'select',
                    inputType: question.questionType === 'input' ? 'number' : undefined,
                    placeholder: 'your answer',
                    options: variants
                });
                index++;
            }
        });
        return config;
    }

}
