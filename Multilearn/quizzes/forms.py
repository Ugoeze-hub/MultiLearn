from django import forms

class QuizForm(forms.Form):
    def __init__(self, *args, **kwargs):
        questions = kwargs.pop('questions')
        super().__init__(*args, **kwargs)


        for i, question in enumerate(questions):

            options = question.options.all().order_by('label')

            self.fields[f'question_{i}'] = forms.ChoiceField(
                label = question.text,
                choices=[(opt.label, opt.text) for opt in options],

                widget=forms.RadioSelect,
                required=True
            )