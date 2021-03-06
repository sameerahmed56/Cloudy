// const BASE_URL = "https://tech.kiet.edu/api/hrms/";
const BASE_URL = "https://96c135cab8ca.ngrok.io/";
// const BASE_URL = 'http://10.42.0.17:8000/'
// const BASE_URL = 'http://192.168.42.55:8000';

export default {
    DIGITAL_ID_CARD: BASE_URL + "Registrar/digital_id/",
    LOGIN_USER: BASE_URL + "student_login/",
    TIME_TABLE: BASE_URL + "StudentPortal/getComponents/?request_type=time_table",
    SEM_DATA: BASE_URL + "StudentPortal/getComponents/?request_type=mobikiet_sem_data",
    ATT_TYPES: BASE_URL + "StudentPortal/getComponents/?request_type=attendance_type",
    ATT_DATA: BASE_URL + "StudentPortal/getComponents/?request_type=REQUEST_ATTENDANCE",
    PROFILE_DATA: BASE_URL + "StudentPortal/getComponents/?request_type=app_profile",
    BANK_DETAILS_APPEND: BASE_URL + "StudentPortal/StudentBankDetails/",
    IFSC_VERIFY: "https://ifsc.razorpay.com/",
    CHANGE_PASSWORD: BASE_URL + "student_change_password/",
    ATTENDANCE: BASE_URL + 'StudentPortal/getComponents/?request_type=mobikiet_att',
    FORGOT_PASSWORD: BASE_URL + "forgot_new/",
    VERIFY_OTP: BASE_URL + "checking_new/",
    CHANGE_PASS_OTP: BASE_URL + "change_pass_otp_new/",
    SUBJECT_DROPDOWN: BASE_URL + "StudentPortal/LessonPlanOnPortal/?request_type=get_student_subjects",
    THEORY_LESSON_PLAN: BASE_URL + "StudentPortal/LessonPlanOnPortal/?request_type=get_lesson_plan_data&subject=",
    TUTORIAL_LESSON_PLAN: BASE_URL + "StudentPortal/LessonPlanOnPortal/?request_type=get_lesson_plan_data&subject=",
    CT_DROPDOWN: BASE_URL + "StudentPortal/student_marks/?request_type=get_exams",
    MARKS_CT: BASE_URL + "StudentPortal/student_marks/?request_type=get_marks&exam_id=",
    ATTENDANCE_TYPES: BASE_URL + "StudentPortal/getComponents/?request_type=attendance_type",
    ATTENDANCE_SUBJECT_TYPES: BASE_URL + "StudentPortal/getComponents/?request_type=get_sub_type",
    ATTENDANCE_GET_SUBJECTS: BASE_URL + "StudentPortal/getComponents/?request_type=get_sem_subjects",
    ATTENDANCE_SUB_WISE: BASE_URL + "StudentPortal/getComponents/?request_type=mobikiet_att_sub_wise",
    STUDENT_FEEDBACK: BASE_URL + 'StudentFeedback/student_feed_data/',
    SUBMIT_FEEDBACK: BASE_URL + 'StudentFeedback/submit_feedback/', 
    PREVIOUS_GRIEVANCE: BASE_URL + 'Redressal/RedressalInsert/?request_type=view_previous',
    GRIEVANCE_FEEDBACK: BASE_URL + 'Redressal/RedressalInsert/',
    FILL_FEEDBACK: BASE_URL + 'Redressal/getComponents/?request_type=',
    FCM_INSERT: BASE_URL + 'fcm_insert/',
    FCM_DELETE: BASE_URL + 'fcm_remove/',
    ACADEMIC_CALENDAR: BASE_URL + 'StudentPortal/getComponents/?request_type=academic_calendar',
    SEM_COMMENCEMENT: BASE_URL + 'StudentPortal/getComponents/?request_type=sem_commencement',
    INDISCIPLINE_DOWNLOAD: 'https://tech.kiet.edu/upload_images/IndiscliplinaryDocument/IndiscliplinaryDocument/',
    UPLOAD_IMAGE: BASE_URL + 'dashboard/upload/',
    MENTOR_CARD_DATA: BASE_URL + 'StudentPortal/MentorCardOnPortal/?request_type=get_data',
    MENTOR_ACTIVITY_TYPE: BASE_URL + 'StudentPortal/getComponents/?request_type=get_activity_type',
    SUBMIT_MENTOR_ACTIVITY: BASE_URL + 'StudentPortal/Activities_Student_Portal/',
    CreativeCell:BASE_URL+'ccell_data/',
    BASE_URL_FILES:'https://tech.kiet.edu/upload_images',
    FEE_RECEIPT_DATA:BASE_URL+"StudentPortal/getComponents/?request_type=fee_receipts",
    FEE_RECEIPT_DOWNLOAD:BASE_URL+"StudentPortal/print_fee_rec/?fee_rec_no=",

}
