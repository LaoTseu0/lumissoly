"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FunctionComponent } from "react";
import { QUESTIONS } from "../../data/form/questions";
import { useSignupStore } from "@store/signup.store";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";

interface SecretProps {}

const Secret: FunctionComponent<SecretProps> = () => {
  const {
    firstQuestion,
    secondQuestion,
    thirdQuestion,
    firstAnswer,
    secondAnswer,
    thirdAnswer,
    setFirstQuestion,
    setFirstAnswer,
    setSecondQuestion,
    setSecondAnswer,
    setThirdQuestion,
    setThirdAnswer,
  } = useSignupStore();

  return (
    <fieldset className="flex flex-col gap-8 mb-6">
      <div>
        <Select
          value={firstQuestion}
          onValueChange={(value) => setFirstQuestion(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={QUESTIONS[0]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{QUESTIONS[0]}</SelectItem>
            <SelectItem value="1">{QUESTIONS[1]}</SelectItem>
            <SelectItem value="2">{QUESTIONS[2]}</SelectItem>
            <SelectItem value="3">{QUESTIONS[3]}</SelectItem>
            <SelectItem value="4">{QUESTIONS[4]}</SelectItem>
          </SelectContent>
        </Select>
        <Label>
          <p className="text-p-mobil text-secondary">Votre réponse :</p>
        </Label>
        <Input
          type="text"
          name="firstAnwser"
          value={firstAnswer}
          onChange={(e) => setFirstAnswer(e.target.value)}
        />
      </div>
      <div>
        <Select
          value={secondQuestion}
          onValueChange={(value) => setSecondQuestion(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={QUESTIONS[0]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{QUESTIONS[0]}</SelectItem>
            <SelectItem value="1">{QUESTIONS[1]}</SelectItem>
            <SelectItem value="2">{QUESTIONS[2]}</SelectItem>
            <SelectItem value="3">{QUESTIONS[3]}</SelectItem>
            <SelectItem value="4">{QUESTIONS[4]}</SelectItem>
          </SelectContent>
        </Select>
        <Label>
          <p className="text-p-mobil text-secondary">Votre réponse :</p>
        </Label>
        <Input
          type="text"
          name="secondAnswer"
          value={secondAnswer}
          onChange={(e) => setSecondAnswer(e.target.value)}
        />
      </div>

      <div>
        <Select
          value={thirdQuestion}
          onValueChange={(value) => setThirdQuestion(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={QUESTIONS[0]} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{QUESTIONS[0]}</SelectItem>
            <SelectItem value="1">{QUESTIONS[1]}</SelectItem>
            <SelectItem value="2">{QUESTIONS[2]}</SelectItem>
            <SelectItem value="3">{QUESTIONS[3]}</SelectItem>
            <SelectItem value="4">{QUESTIONS[4]}</SelectItem>
          </SelectContent>
        </Select>
        <Label>
          <p className="text-p-mobil text-secondary">Votre réponse :</p>
        </Label>
        <Input
          type="text"
          name="thirdAnswer"
          value={thirdAnswer}
          onChange={(e) => setThirdAnswer(e.target.value)}
        />
      </div>
    </fieldset>
  );
};

export default Secret;
