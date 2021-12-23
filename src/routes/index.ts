import { Application } from "express";
import express from "express";
import admin from "./admin";

import patient from  './patient'
import notifications from  './notifications';

import blog from  './blog'
import error from  "../middleware/error"
import version from  "../constant/version"

export default function (app: Application) {
  app.use(express.json());
  app.use(error);
  app.use(`/${version.API_VERSION}/api/admin`, admin);
  app.use(`/${version.API_VERSION}/api/notifications`, notifications);
  app.use(`/${version.API_VERSION}/api/patient`, patient);
  app.use(`/${version.API_VERSION}/api/blog`, blog);
}