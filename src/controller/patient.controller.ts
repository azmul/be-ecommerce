import { Response } from "express";
import mongodb from "mongodb"
import { numericCode } from 'numeric-code'
import { IGetUserAuthInfoRequest } from "../defination/apiDefination";
import { pick } from "lodash";
import { log } from "../logger/logging";
import Patient  from  '../models/patient'
import { phoneVerify } from "../service/twilio.service";
import Link from  '../models/link'
import bcrypt from  'bcrypt'
import ROLE from  '../constant/roleConstant'
import Cloudinary from  '../utils/cloudinary'
import API from  "../constant/apiContant"
import { Twilio } from "twilio";   
import { TWILIO_ACCOUNT_SID , TWILIO_AUTH_TOKEN, TWILIO_VERIFICATION_SID} from "../environment";


const ObjectId: any = mongodb.ObjectId;

export async function phoneVerifyPatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
    const phone: any =  req?.query?.phone;
    if (!phone) return res.status(400).send({status: 400, message: 'Did not get phone number.'});

    try{
      let isPatient = await Patient.findOne({ phone });
      if (isPatient) return res.status(400).send({status: 400, message: 'Duplicate Phone Number.'});

      await phoneVerify(phone, res);

    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function registerPatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
    try {
     const { name, phone, password, code } =  req.body;
     
     const link: any = await Link.findOne({ is_active: false });

     const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

     client.
     verify.
     services(TWILIO_VERIFICATION_SID).
     verificationChecks.
     create({
         to: `+88${phone}`,
         code: code,
     }).then(async (data: any) => {
         if(data.valid) {
            let patient = new Patient({ numeric_id: numericCode(6), name, phone, password, link: link.link, role: ROLE.PATIENT_ROLE });
            
            const salt = await bcrypt.genSalt(10);
            patient.password = await bcrypt.hash(password, salt);

            await patient.save();
            
            if(link._id) {
              await Link.findByIdAndUpdate(link._id, { is_active: true, patient_phone: phone });
            }
            
            const response = pick(patient, ['numeric_id','name', 'phone']);
            res.status(201).send(response);
         } else {
           res.status(400).send({status: 400, message: 'Verification code is invalid'}); 
         }
     })
 
   } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function loginPatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const { phone, password } = req.body;
    let patient = await Patient.findOne({ phone });
    if (!patient) return res.status(400).send({status: 400, message: 'Invalid phone or password.'});

    const validPassword = await bcrypt.compare(password, patient.password);
    if (!validPassword) return res.status(400).send({status: 400, message: 'Invalid phone or password.'});

    if(!patient.is_active) {
      return res.status(400).send({status: 400, message: 'You are not availabale now!. Please contact with Admin'});
    }
    
    const token = patient.generateAuthToken();
    res.header('x-auth-token', token).status(200)
       .send({data: pick(patient,  ['_id','numeric_id' ,'picture_url', 'name', 'link',
        'phone', 'gender', 'birth_day', 'email', 'city', 'thana', 'street', 'post_code', 'about_your_self', 
        'is_update_profile', 'is_active', 'role']), token });
  }catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function profilePatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const id: any = req?.user?._id;
    if(!id) res.status(400).send({status: 400, message: 'Id not found'});

    const patient = await Patient.findById(id).select('-password');
    res.status(200).send(patient);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function updateProfilePatientHandler(req: IGetUserAuthInfoRequest, res: Response) { 
  try {
    const id: any = req?.user?._id;
    if(!id) res.status(400).send({status: 400, message: 'Id not found'});

    const {name, email, gender, birth_day, city, thana, street, post_code, about_your_self} = req.body;

    const patient = await Patient.findByIdAndUpdate(id, {name, email, gender, birth_day, city, thana ,street, post_code, about_your_self, is_update_profile: true });
    
    if (!patient) res.status(404).send({status: 404, message: 'The patient with the given id was not found'});
    
    const patientUpdate = await Patient.findById(id).select('-password');
    res.status(200).send( { data: patientUpdate, message: 'Profile updated successfully'});

  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function phoneVerifyRecoverPasswordPatientHandler(req: IGetUserAuthInfoRequest, res: Response) { 
  const phone: any =  req?.query?.phone;
    if (!phone) return res.status(400).send({status: 400, message: 'Did not get phone number.'});
    try{
      let isPatient = await Patient.findOne({ phone });
      if (!isPatient) return res.status(400).send({status: 400, message: 'Phone Number Not found'});

      const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      client.
      verify.
      services(TWILIO_VERIFICATION_SID).
      verifications.
      create({
          to: `+88${phone}`,
          channel: 'sms'
      }).then((data: any) => {
        res.status(200).send({status: data.status, to: data.to, valid: data.valid});
      });
    } catch(err: any){
      log.error(err);
      res.status(400).send({status: 400, message: err?.message});
    }
}

export async function recoverPasswordPatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const { phone, password, code } =  req.body;
    const patient = await Patient.findOne({ phone });
    if (!patient) return res.status(400).send({ message: 'Phone Number not found' });
    
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    client.
    verify.
    services(TWILIO_VERIFICATION_SID).
    verificationChecks.
    create({
        to: `+88${phone}`,
        code: code,
    }).then(async (data: any) => {
        if(data.valid) {
         const salt = await bcrypt.genSalt(10);
         const newPassword = await bcrypt.hash(password, salt);
 
         await Patient.findByIdAndUpdate(patient._id, { password: newPassword });
         res.status(200).send({status: 200, phone });
 
        } else {
           res.status(400).send({status: 400, message: 'Not Valid'});
        }
    })
 
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function changePasswordPatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const id: any = req?.user?._id;
    if(!id) res.status(400).send({status: 400, message: 'Id not found'});

    const phone: any =  req?.query?.phone;
    if(!phone) res.status(400).send({status: 400, message: 'Phone not found'});

    const {password, confirm, current} = req.body;

    if(password !== confirm) {
      res.status(400).send({status: 400, message: 'New password and confirm password are not same'});
    }

    let patient = await Patient.findOne({ phone });
    if (!patient) return res.status(404).send({status: 404, message: 'Patient not found'});

    const isCurrent = await bcrypt.compare(current, patient.password);

    if(!isCurrent) {
      res.status(400).send({status: 400, message: 'Providing Current password is wrong'});
    }

    const isSame = await bcrypt.compare(password, patient.password);

    if(isSame) {
      res.status(400).send({status: 400, message: 'Old password and new password same'});
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      await Patient.findByIdAndUpdate(id, { password: newPassword });
      res.status(200).send({ message: 'Password Successfully Changed'});
    }

  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function uploadImagePatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const id: any = req?.user?._id;
    if(!id) res.status(400).send({status: 400, message: 'Id not found'});

      const isPatient = await Patient.findById(id);

      if(isPatient) {
        const { imageData } = req.body;
        const uploadResponse = await Cloudinary.uploader.upload(imageData, {
            upload_preset: 'patients',
        });

        await Patient.findByIdAndUpdate(id, { picture_url: uploadResponse.public_id });
      
        const patientUpdate = await Patient.findById(id).select('-password');
        res.status(200).send( { data: patientUpdate, message: 'Profile image updated successfully'});

      } else {
        res.status(404).send({ status:404, message: 'Patient not found'});
      }

  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function getAllPatientsHandler(req: IGetUserAuthInfoRequest, res: Response) {
  const id = req.body.last_id;
  let query = {};

  if(id) {
      query = {'_id': {'$gt':new ObjectId(id)}};
  }
  try {
      const patients = await Patient.find(query, {password: 0}).limit(API.DEFAULT_DATA_PER_PAGE);
      const total = await Patient.find().countDocuments()
      
      res.status(200).send({
          data: patients,
          meta: {
              total
          }
      });
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function getAllPatientsByAdminHandler(req: IGetUserAuthInfoRequest, res: Response) {
    
  const { current =  1, pageSize = API.DEFAULT_DATA_PER_PAGE } = req.query;
  const skips = Number(pageSize) * (Number(current) - 1);

try {
    const skipFields = {password: 0}
    
    const doctors = await Patient.find({}, skipFields).sort({createdAt: -1}).skip(skips).limit(Number(pageSize));
    const total = await Patient.find().countDocuments()

    res.status(200).send(
        {
            data: doctors,
            meta: {
                total
            }
        }
    );
} catch(err: any){
  log.error(err);
  res.status(400).send({status: 400, message: err?.message});
}
}

export async function getActivePatientsHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const { is_active } = req.body;
    const patients = await Patient.find({ is_active });
    res.status(200).send(patients);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function getSinglePatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  const id = req.params.id;

  try {
      const patient = await Patient.findById(id).select('-password');
      if (!patient) return res.status(404).send('The Patient with the given id was not found');

      res.status(200).send(patient);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function getSinglePatientByAdminHandler(req: IGetUserAuthInfoRequest, res: Response) {
  const id = req.params.id;

  try {
      const patient = await Patient.findOne({numeric_id: id}).select('-password');
      if (!patient) return res.status(404).send({message: 'The Patient with the given id was not found'});

      res.status(200).send(patient);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function deletePatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  const id = req.params.id;

  try {
      const patient = await Patient.findByIdAndUpdate(id, { is_active: false });
      if (!patient) return res.status(404).send('The Patient with the given id was not found');
      
      res.status(200).send(patient);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function activePatientHandler(req: IGetUserAuthInfoRequest, res: Response) {
  const id = req.params.id;

  try {
      const patient = await Patient.findByIdAndUpdate(id, { is_active: true });
      if (!patient) return res.status(404).send('The Patient with the given id was not found');

      res.status(200).send(patient);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}

export async function getAllPatientsImageHandler(req: IGetUserAuthInfoRequest, res: Response) {
  try {
    const { resources } = await Cloudinary.search
    .expression('folder:patients')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

    const publicIds = resources.map((file: any) => file.public_id);
    res.status(200).send(publicIds);
  } catch(err: any){
    log.error(err);
    res.status(400).send({status: 400, message: err?.message});
  }
}