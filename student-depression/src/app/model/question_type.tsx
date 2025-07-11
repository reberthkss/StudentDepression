export enum QuestionType {
    alternative = "alternative",
    number = "number",
    slider = "slider",
    date = "date",
}

interface onResponseCallbackInterface {
    onChange: (value: string) => void;
}

interface QuestionBaseInterface {
    id: string;
    title: string;
    description: string;
    response?: string;
}

export abstract class QuestionBase implements QuestionBaseInterface {
    constructor(props: QuestionBaseInterface) {
        this.id = props.id;
        this.title = props.title;
        this.description = props.description;
    }

    id: string;
    title: string;
    description: string;
    response: string | undefined;

    abstract buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement

}

export abstract class QuestionDecorator extends QuestionBase {
    protected question: QuestionBase;

    constructor(question: QuestionBase) {
        super({ id: question.id, title: question.title, description: question.description});
        this.question = question;
    }

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return this.question.buildWidget(onResponseCallback);
    }
}

export class QuestionWithLayoutDecorator extends QuestionDecorator {
    constructor(question: QuestionBase) {
        super(question);
    }

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return (
            <div className="flex-1 p-6 mt-4">
                <h2 className="text-[2rem] font-bold text-center dark:text-white">
                    {this.title}
                </h2>
                <p className="text-[1.3rem] text-indigo-500 mb-4 text-center">
                    {this.description}
                </p>
                {super.buildWidget(onResponseCallback)}
            </div>
        )
    }
}

interface AlternativeQuestionInterface extends QuestionBaseInterface {
    alternatives: string[];
    labels: string[];
}

export class AlternativeQuestion extends QuestionBase implements AlternativeQuestionInterface {
    constructor(props: AlternativeQuestionInterface) {
        super({ id: props.id, title: props.title, description: props.description});
        this.alternatives = props.alternatives;
        this.labels = props.labels;
    }

    alternatives: string[];
    labels: string[];

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return (
            <div>
                <fieldset>
                    {
                        this.alternatives.map((alternative, index) => (
                            <label key={index} className="flex items-center space-x-3 font-mono dark:text-white border-3 my-2 p-3 rounded-md border-indigo-300 hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`q-${this.id}`}
                                    value={alternative}
                                    onChange={(e) => {
                                        onResponseCallback.onChange(e.target.value);
                                    }}
                                />
                                <span className='font-mono dark:text-white'>{this.labels[index]}</span>
                            </label>
                        ),)
                    }
                </fieldset>
            </div>
        )
    }
}

interface NumberQuestionInterface extends QuestionBaseInterface {
    placeholder: string;
    min: number;
    max: number;
}

export class NumberQuestion extends QuestionBase implements NumberQuestionInterface {
    constructor(props: NumberQuestionInterface) {
        super({ id: props.id, title: props.title, description: props.description });
        this.placeholder = props.placeholder;
        this.min = props.min;
        this.max = props.max;
    }

    placeholder: string;
    min: number;
    max: number;

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return (
            <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                placeholder={this.placeholder}
                onChange={(e) => {
                    const value = parseInt(e.target.value);

                    if (isNaN(value)) {
                        onResponseCallback.onChange('');
                        return;
                    }

                    if (value >= this.min && value <= this.max) {
                        onResponseCallback.onChange(e.target.value);
                        return;
                    } else {
                        onResponseCallback.onChange('');
                        return;
                    }
                }}
            />
        )
    }
}

interface SliderQuestionInterface extends QuestionBaseInterface {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    labels?: string[];
}

export class SliderQuestion extends QuestionBase implements SliderQuestionInterface {
    constructor(props: SliderQuestionInterface) {
        super({ id: props.id, title: props.title, description: props.description });
        this.min = props.min ?? 1;
        this.max = props.max ?? 5;
        this.step = props.step ?? 1;
        this.labels = props.labels ?? ['1', '2', '3', '4', '5'];
        this.defaultValue = props.defaultValue ?? 1;
    }

    min: number;
    max: number;
    step: number;
    defaultValue: number;
    labels: string[];;

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return (
            <div>
                <input
                    type="range"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    min={this.min}
                    max={this.max}
                    step={this.step}
                    defaultValue={this.defaultValue}
                    onChange={(e) => onResponseCallback.onChange(e.target.value)}
                />
                <div className="flex flex-row justify-between mt-2">
                    {
                        this.labels.map((label, index) => (
                            <span key={index} className="text-sm text-gray-500 dark:text-gray-400">
                                {label}
                            </span>
                        ))
                    }
                </div>
            </div>
        );
    }

}

interface DateQuestionInterface extends QuestionBaseInterface {
    min?: string;
    max?: string;
}

export class DateQuestion extends QuestionBase implements DateQuestionInterface {
    constructor(props: DateQuestionInterface
    ) {
        super({ id: props.id, title: props.title, description: props.description });
        this.min = props.min ?? '1940-01-01';
        this.max = props.max ?? '2025-12-31';
    }

    min: string;
    max: string;

    buildWidget(onResponseCallback: onResponseCallbackInterface): React.ReactElement {
        return (
            <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
                onChange={(e) => onResponseCallback.onChange(e.target.value)}
                min={this.min}
                max={this.max}
            />
        )
    }
}