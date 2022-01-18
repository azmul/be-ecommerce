import { Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import { log } from "../logger/logging";
import Question from "../models/questions";
import API from "../constant/apiContant";
import { numericCode } from "numeric-code";

export async function getAllQuestionsHandler(req: Request, res: Response) {
  const {
    current = 1,
    pageSize = API.DEFAULT_DATA_PER_PAGE,
    startDate,
    endDate
  } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);

  const skipFields = {
    comment: 0,
    last_updated_by: 0,
  };

  const query: any = {};
  if (startDate && endDate) {
    const start: any = startDate;
    const end: any = endDate;
    if(start && end) {
      query.updatedAt = {
        $gte: new Date(start),
        $lt: new Date(end),
      };
    }
  }

  try {
    const questions = await Question.find(query, skipFields)
      .sort({ updatedAt: -1 })
      .skip(skips)
      .limit(Number(pageSize));
    const total = await Question.find(query).countDocuments();

    res.status(200).send({
      data: questions,
      pagination: {
        total,
        pageSize,
        current,
      },
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
}

export async function getQuestionByProductIdHandler(req: Request, res: Response) {
  const id = req.params.id;
  try {
    const question =  await Question.findOne({product_numeric_id: Number(id)});
    res.status(200).send(question);
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

export async function getQuestionHandler(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const question =  await Question.findById(id);
      res.status(200).send(question);
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
}

export async function createQuestionHandler(
    req: IGetUserAuthInfoRequest,
    res: Response
  ) {
    try {
  
      const question = new Question({
        ...req.body,
        id: numericCode(14)
      });
      await question.save();
      res.status(201).send({ message: "question Created", status: 201 });
    } catch (err: any) {
      log.error(err);
      res.status(400).send({ status: 400, message: err?.message });
    }
}

export async function updateQuestionHandler(
  req: IGetUserAuthInfoRequest,
  res: Response
) {
  const id = req.params.id;

  try {
    const { questionId, customerPhone, customerName, ques, ans, ansTime, isDeleted } = req.body;

    const item = await Question.findById(id);
    if (!item)
      return res.status(404).send("The question with the given id was not found");
    const questions: any = item.questions;

    const questionIndex = questions.findIndex((question: any) => Number(question.id) === Number(questionId))

    if(!!isDeleted && questionIndex !== -1) {
        questions.splice(questionIndex, 1);
    } else {
        if(questionIndex === -1) {
            questions.unshift({ customerName, customerPhone, ques, isAns: false, ans, ansTime, id: numericCode(6), createdAt: new Date() })
        } else {
            if(ans) {
                questions[questionIndex].isAns = true;
                questions[questionIndex].ans = ans;
                questions[questionIndex].ansTime = new Date();
            }
        }
    }

    await Question.findByIdAndUpdate(id, { questions: questions });
    res.status(200).send({ message: "question Updated" });
  } catch (err: any) {
    log.error(err);
    res.status(400).send({ status: 400, message: err?.message });
  }
}

