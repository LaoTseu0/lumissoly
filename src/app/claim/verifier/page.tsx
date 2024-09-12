"use client";
import { Input } from "@components/ui/input";
import { QUESTIONS } from "@data/form/questions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { FunctionComponent, useState } from "react";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";

interface SecretVerifierProps {}

const SecretVerifier: FunctionComponent<SecretVerifierProps> = () => {
  const [firstQuestion, setFirstQuestion] = useState<string>("");
  const [secondQuestion, setSecondQuestion] = useState<string>("");
  const [thirdQuestion, setThirdQuestion] = useState<string>("");
  const [firstAnswer, setFirstAnswer] = useState<string>("");
  const [secondAnswer, setSecondAnswer] = useState<string>("");
  const [thirdAnswer, setThirdAnswer] = useState<string>("");

  // const handleSubmit = () => {

  // }

  return (
    <div className="flex flex-col gap-8 mb-6">
      <p className="text-p-mobil text-center">
        Afin de vous connecter à votre compte vous devez répondre aux questions
        secretes associées a celui-ci
      </p>

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
      <Button>Valider</Button>
    </div>
  );
};

export default SecretVerifier;
