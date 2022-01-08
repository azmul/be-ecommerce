import { Application } from "express";
import express from "express";
import admin from "./admin";
import tag from "./tag";
import category from "./category";
import slider from "./slider";
import testimonial from "./testimonial";
import message from "./message";
import patient from  './patient'
import notifications from  './notifications';
import blog from  './blog'
import image from  './image'
import error from  "../middleware/error"
import version from  "../constant/version"

export default function (app: Application) {
  app.use(express.json());
  app.use(error);
  app.use(`/${version.API_VERSION}/api/admin`, admin);
  app.use(`/${version.API_VERSION}/api/tag`, tag);
  app.use(`/${version.API_VERSION}/api/image`, image);
  app.use(`/${version.API_VERSION}/api/category`, category);
  app.use(`/${version.API_VERSION}/api/slider`, slider);
  app.use(`/${version.API_VERSION}/api/testimonial`, testimonial);
  app.use(`/${version.API_VERSION}/api/message`, message);
  app.use(`/${version.API_VERSION}/api/notifications`, notifications);
  app.use(`/${version.API_VERSION}/api/patient`, patient);
  app.use(`/${version.API_VERSION}/api/blog`, blog);
}