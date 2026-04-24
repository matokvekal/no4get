
# 1. סקירה כללית / Overview

**Gift Vibes** היא אפליקציית מובייל חכמה שמטרתה לעזור למשתמשים לנהל אירועים אישיים חשובים, להבין למי הם קונים מתנה, ולקבל הצעות מותאמות אישית באמצעות AI.

האפליקציה פותרת שתי בעיות מרכזיות:

1. אנשים שוכחים אירועים חשובים או נזכרים מאוחר מדי.
2. גם כשהם נזכרים, הם לא יודעים מה לקנות ומבזבזים זמן על חיפוש לא ממוקד.

המוצר משלב בין:

* ניהול אנשים ואירועים
* מנוע AI לפרסונליזציה
* פיד השראה ויזואלי למתנות
* תהליך בחירה, התאמה והזמנה של מתנה

---

# 1.5 סטאק טכנולוגי / Tech Stack

## פרונטאנד

* React (Vite) — web application
* Capacitor — wraps the web app as a native iOS + Android app
* Zustand — global state management
* CSS (Flexbox) — component-scoped styles, no heavy UI frameworks

## באקאנד

* Node.js + Express

## מסד נתונים

* PostgreSQL via **Supabase** (managed, free tier)
* Connection via standard `pg` library using Supabase's `DATABASE_URL`

## Hosting

* AWS (backend + frontend)
* Supabase (database)

## AI

* OpenAI GPT-4 / GPT-4o
* מגבלה: עד 10 הודעות לכל session (user + AI ביחד)
* Fallback: הצגת הצעות ברירת מחדל אם ה-API לא זמין

## Push Notifications

* Firebase Cloud Messaging (FCM)
* MVP: push בלבד — ללא SMS / email fallback

## קטלוג מתנות

* MVP: קטלוג סטטי ומאורגן ידנית
* Future: API חיצוני (Amazon Affiliate / חנויות)

## תשלומים

* MVP: אין עיבוד תשלום ישיר
* לחיצה על "הזמן" פותחת קישור חיצוני לדף המוצר (Amazon / חנות)
* Future: עמלות affiliate

## אימות משתמש

* Google Sign-In
* Apple Sign-In
* אין אימות email/password ב-MVP

---

# 2. מטרת המוצר

ליצור חוויית משתמש שמקצרת את הדרך בין:

**“יש למישהו שאני מכיר אירוע בקרוב”**
לבין
**“בחרתי מתנה מתאימה ושלחתי אותה”**

המטרה היא להפוך את קניית המתנות ל:

* פשוטה
* מהירה
* מותאמת אישית
* מהנה
* מבוססת AI

---

# 3. חזון המוצר

להיות הפלטפורמה האישית והחכמה ביותר לניהול מתנות ואירועים, כזו שמבינה את האדם שמקבל את המתנה, מציעה רעיונות רלוונטיים, ועוזרת למשתמש לבחור בזמן הנכון ובמינימום מאמץ.

---

# 4. הבעיה

## 4.1 כאבי משתמש

משתמשים:

* שוכחים ימי הולדת, ימי נישואין ואירועים חשובים
* נזכרים ברגע האחרון
* לא יודעים מה לקנות
* מתקשים להתאים מתנה לאדם ספציפי
* מחפשים באתרים רבים בלי הכוונה אמיתית
* לא שומרים היסטוריה מסודרת של מה קנו ולמי

## 4.2 פער קיים בשוק

אין כיום פתרון נוח שמחבר במקום אחד בין:

* רשימת אנשים חשובים
* תאריכים ואירועים
* פרסונליזציה חכמה
* גילוי מתנות
* הצעות מעשיות בזמן אמת

---

# 5. קהל יעד

## 5.1 קהל יעד ראשי

* גילאי 20–40
* אנשים עם חיי חברה פעילים
* קונים מתנות לחברים, בני זוג, משפחה, קולגות
* מחפשים פתרון נוח ומהיר
* פתוחים לשימוש ב-AI

## 5.2 קהל יעד משני

* קבוצות חברים שקונות מתנות יחד
* עובדים בצוותים/חברות
* משתמשים שאוהבים לוחות השראה וגלילה ויזואלית
* משתמשים שאוהבים טרנדים ורעיונות חדשים

---

# 6. הצעת הערך

Gift Vibes לא רק מזכירה למשתמש שיש אירוע.
היא גם:

* מבינה למי קונים
* בונה פרופיל חכם לאותו אדם
* מציעה מתנות רלוונטיות
* מסננת לפי תקציב, vibe וסגנון
* מאפשרת תהליך בחירה נעים ומהיר

הערך המרכזי:
**פחות לחץ, פחות חיפוש, יותר התאמה אישית.**

---

# 7. עקרונות מוצר

## 7.1 AI כגורם מרכזי

ה־AI הוא לא קישוט, אלא מנוע ליבה:

* שואל שאלות
* אוסף מידע
* מסכם פרופיל
* מציע מתנות
* מציע ברכות

## 7.2 חוויית משתמש מהנה

המוצר צריך להרגיש:

* מודרני
* נעים
* לא עמוס
* ויזואלי
* חכם אך נגיש

## 7.3 פעולה מהירה

בכל שלב המשתמש צריך להרגיש שהוא מתקדם בקלות לעבר המתנה המתאימה.

## 7.4 פרסונליזציה לאורך זמן

המערכת לומדת מכל אינטראקציה:

* אילו מתנות נשמרו
* אילו נרכשו
* מה היה התקציב
* איזה סגנון מתאים לכל אדם

---

# 8. היקף MVP

ה־MVP יתמקד בפיצ’רים הבאים:

1. הוספת אנשים ואירועים
2. צ’אט עם סוכן AI
3. יצירת פרופיל אדם
4. פיד השראה למתנות
5. הצגת 3 המלצות מתנה עיקריות
6. ניהול תקציב
7. יצירת ברכה אוטומטית
8. היסטוריית מתנות
9. התראות לפני אירוע
10. אפשרות בסיסית למתנה קבוצתית

---

# 9. מסכי המוצר

## 9.0 מסך כניסה ואימות / Auth & Onboarding

### מטרה

כניסה ראשונה למערכת ואימות זהות המשתמש.

### זרימה

1. מסך פתיחה עם לוגו ו-tagline
2. כפתור "Continue with Google"
3. כפתור "Continue with Apple"
4. לאחר אימות מוצלח — הפניה למסך הבית
5. משתמש חדש מקבל הדרכת onboarding קצרה (3 מסכים)

### מסכי Onboarding (משתמש חדש בלבד)

* מסך 1: "הוסף אנשים חשובים לחייך"
* מסך 2: "ה-AI מבין את הטעם שלהם"
* מסך 3: "מצא מתנה בדיוק בזמן"
* כפתור "Get Started"

### מצב ריק (לאחר onboarding)

* הצגת כרטיס onboarding במסך הבית
* CTA: "הוסף את האדם הראשון שלך"

---

## 9.1 מסך בית / Home

### מטרה

להציג למשתמש את כל מה שדורש פעולה בקרוב.

### תוכן

* אנשים עם אירועים קרובים
* התראות חכמות
* כרטיסיות פעולה מהירה
* המלצות AI מיידיות
* גישה למסכים אחרים

### רכיבים

* כותרת אישית
* אזור התראות
* כרטיסי אנשים לפי דחיפות
* CTA: “בחר מתנה”
* CTA: “הוסף אדם”
* CTA: “עבור ללוח השראה”

### לוגיקה

* האירוע הקרוב ביותר יופיע ראשון
* אם נשאר שבוע לאירוע, הכרטיס יודגש
* אם קיימות כבר 3 המלצות, הן יוצגו ישירות בכרטיס

---

## 9.2 מסך אנשים ואירועים / People & Events

### מטרה

לאפשר ניהול של כל האנשים והאירועים.

### פעולות

* הוספת אדם חדש
* סנכרון/בחירה מאנשי קשר
* צפייה בפרופיל אדם
* עריכת תקציב
* פתיחת צ’אט AI
* איתור מתנה

### מידע לכל אדם

* תמונה
* שם
* סוג קשר
* האירוע הבא
* תאריך האירוע
* כמה ימים נשארו
* תקציב מוגדר
* מצב פרופיל AI

---

## 9.3 מסך פרופיל אדם

### מטרה

לרכז את כל המידע על אדם אחד.

### תוכן

* פרטי בסיס
* אירועים חשובים
* תקציב
* תחומי עניין
* סיכום פרסונלי שנוצר ע"י AI
* היסטוריית מתנות
* ברכות קודמות
* כתובות משלוח
* כפתור למציאת מתנה
* כפתור לפתיחת מתנה קבוצתית

---

## 9.4 מסך צ’אט עם סוכן AI

### מטרה

ליצור פרופיל מותאם אישית לכל אדם.

### זרימה

1. המשתמש בוחר אדם
2. נפתח צ’אט
3. המשתמש מזין תאריך ותקציב
4. ה־AI שואל שאלות
5. נוצר פרופיל מסכם

### שאלות אפשריות

* מה הקשר שלך אליו?
* מה הוא אוהב?
* איזה סוג מתנות מתאים לו?
* מה התקציב?
* יש דברים שכדאי להימנע מהם?
* מה קנית לו בעבר?
* האם האירוע מרגש, קליל, מצחיק או חשוב במיוחד?

### מגבלות Session

* מקסימום 10 הודעות לכל session (user + AI ביחד)
* בסוף ה-session נוצר פרופיל אוטומטית
* אם המשתמש הגיע למגבלה לפני יצירת פרופיל — מוצגות שאלות סיכום קצרות

### Fallback — כישלון AI

* אם ה-API של OpenAI לא זמין — מוצגות הצעות ברירת מחדל לפי קטגוריה
* הודעה למשתמש: "הצ'אט לא זמין כרגע, אבל יש לנו הצעות בשבילך"

### תוצרים

* תקציר פרופיל
* תחומי עניין
* סגנון מתנות מועדף
* vibe מתאים
* טון מומלץ לברכה
* טווח תקציב

---

## 9.5 מסך לוח השראה / Inspiration Board

### מטרה

לאפשר גילוי ויזואלי של מתנות.

### מבנה

* פיד גלילה ויזואלי בסגנון Pinterest
* כרטיסי מתנות גדולים
* פילטרים לפי טרנד, נושא, תקציב ו־vibe

### קטגוריות vibe

* ✨ It’s Giving Main Character
* 😂 It’s Giving Chaos
* 💖 It’s Giving Soft
* 🔥 It’s Giving Iconic

### פעולות על כרטיס

* שמירה
* שיוך לאדם
* פתיחת פרטים
* שיתוף
* הוספה למתנה קבוצתית

---

## 9.6 מסך הצעות מתנה / Gift Suggestions

### מטרה

להציג למשתמש את ההמלצות הכי רלוונטיות לאדם מסוים.

### טריגרים

* אירוע מתקרב
* לחיצה על “מצא מתנה”
* פתיחת המלצות מתוך כרטיס אדם

### תוכן

* שם האדם
* סוג האירוע
* התקציב
* תיאור AI קצר
* 3 המלצות עיקריות
* אפשרות לראות עוד

### על כל המלצה יוצג

* תמונה
* שם
* מחיר
* תג vibe
* סיבת התאמה
* כפתור “בחר”
* כפתור “שדרג”
* כפתור “עוד אפשרויות”

---

## 9.7 מסך הזמנה

### מטרה

להשלים את בחירת ושליחת המתנה.

### הערה — MVP

ב-MVP אין עיבוד תשלום ישיר. לחיצה על "הזמן" פותחת קישור חיצוני לדף המוצר (Amazon / חנות). ניהול התשלום מתבצע מחוץ לאפליקציה. המשתמש מאשר ידנית שהרכישה בוצעה.

### שלבים

1. בחירת מתנה
2. לחיצה על "הזמן" — פתיחת קישור חיצוני **(MVP)**
3. בחירת/הזנת כתובת *(לצורך שמירה בהיסטוריה)*
4. יצירת ברכה
5. סיכום הזמנה
6. אישור ידני "רכשתי"

### ברכה אוטומטית

המערכת תציע ברכה לפי:

* הקשר לאדם
* סוג האירוע
* סגנון הפרופיל

המשתמש יוכל:

* לאשר
* לערוך
* לבקש ניסוח מחדש ב־AI

---

## 9.8 מסך מתנה קבוצתית / Group Gifting

### מטרה

לאפשר למספר אנשים להשתתף יחד במתנה.

### זרימה

1. פתיחת מתנה קבוצתית
2. הגדרת יעד תקציב
3. שיתוף קישור
4. הצטרפות משתתפים
5. מעקב אחר סכום שנצבר
6. הצעות מתנה שמתאימות לתקציב הכולל

### תכונות

* רשימת משתתפים
* סכום לכל משתתף
* סטטוס קבוצה
* AI שמציע מתנות לסכום המצטבר

---

## 9.9 מסך ציר זמן / Timeline

### מטרה

להציג היסטוריית מתנות.

### יוצג

* למי נשלחה מתנה
* מה נשלח
* באיזה תקציב
* מתי
* האם זו מתנה אישית או קבוצתית
* סטטוס

### סינונים

* לפי אדם
* לפי חודש
* לפי תקציב
* לפי סוג אירוע

---

# 10. דרישות פונקציונליות

## 10.1 ניהול אנשים

המערכת תאפשר:

* הוספת אדם
* עריכת אדם
* מחיקת אדם
* חיבור לאנשי קשר
* שמירת תקציב לכל אדם

## 10.2 ניהול אירועים

המערכת תאפשר:

* יצירת אירוע
* אירועים חוזרים
* שיוך אירוע לאדם
* ספירה לאחור
* התראות

## 10.3 צ’אט AI

המערכת תאפשר:

* שיחה עם AI לכל אדם (OpenAI GPT-4 / GPT-4o)
* מגבלה של 10 הודעות per session
* שמירת תוצאות הצ'אט
* עדכון פרופיל קיים
* שאלות המשך לפי חוסרים
* Fallback: הצגת מתנות ברירת מחדל אם ה-API לא זמין

## 10.4 מנוע המלצות

המערכת תציג מתנות לפי:

* תקציב
* תחומי עניין
* vibe
* פופולריות/טרנד
* היסטוריית בחירה

## 10.5 התראות

המערכת תשלח התראות Push בלבד דרך Firebase Cloud Messaging (FCM):

* 30 יום לפני
* 7 ימים לפני
* יום לפני
* ביום האירוע

ב-MVP: אם המשתמש דחה הרשאות push — אין fallback (SMS / email לא נתמך).

## 10.6 ברכות אוטומטיות

המערכת תיצור נוסח ברכה בסיסי וניתן לעריכה.

## 10.7 היסטוריה

המערכת תשמור:

* מתנות שנשלחו
* תקציב
* תאריכים
* הקשר לאדם

## 10.8 מתנה קבוצתית

המערכת תאפשר:

* יצירת קבוצה
* ניהול תרומות
* שיתוף קישור
* צפייה בהתקדמות

---

# 11. דרישות לא פונקציונליות

## 11.1 ביצועים

* טעינת מסך ראשי מהירה
* גלילה חלקה בפיד
* זמני תגובה קצרים בצ’אט

## 11.2 שימושיות

* חוויית מובייל-first
* מינימום צעדים למשימה עיקרית
* היררכיה ברורה

## 11.3 אבטחה

* שמירה מאובטחת של פרטי משתמש
* ניהול הרשאות גישה לאנשי קשר
* הגנה על נתוני כתובת ומשלוח

## 11.4 סקיילביליות

* מבנה שמאפשר הוספת חנויות/אינטגרציות בעתיד
* הרחבת מנוע המלצות
* תמיכה בפיצ’רים חברתיים נוספים
## 11.5 מצבי ריק ושגיאה / Empty & Error States

| מצב | התנהגות מצופה |
|---|---|
| אין אנשים (משתמש חדש) | מסך onboarding עם CTA "הוסף את האדם הראשון שלך" |
| אין מתנות מתאימות לפילטרים | "לא מצאנו מתנות — נסה להרחיב את הפילטרים" + כפתור reset |
| AI לא זמין (OpenAI down) | הצגת מתנות ברירת מחדל + הודעה מוסברת |
| אין חיבור לרשת | הודעת שגיאה + כפתור "נסה מחדש" |
| קישור הזמנה חיצוני נכשל | הצגת הקישור ידנית + אפשרות copy to clipboard |
| אירוע שהוגדר נמחק | הפניה למסך אנשים עם CTA להוספת אירוע חדש |
---

# 12. מודל נתונים ראשוני

## User

* user_id
* full_name
* email
* phone
* preferences
* notification_settings

## Person

* person_id
* user_id
* full_name
* photo_url
* relationship_type
* notes
* budget_min
* budget_max
* shipping_address
* delivery_preferences

## Event

* event_id
* person_id
* event_type
* event_date
* recurrence
* reminder_settings

## PersonProfileAI

* profile_id
* person_id
* summary
* interests
* dislikes
* gift_style
* greeting_tone
* suggested_budget
* updated_at

## Gift

* gift_id
* title
* description
* image_url
* price
* vibe_tag
* category
* trend_score
* popularity_score
* vendor_link

## SavedGift

* saved_gift_id
* user_id
* person_id
* gift_id
* created_at

## Order

* order_id
* user_id
* person_id
* gift_id
* event_id
* budget_used
* delivery_address
* delivery_time
* card_message
* order_status
* created_at

## GroupGift

* group_gift_id
* event_id
* person_id
* target_amount
* current_amount
* invite_link
* status

## GroupGiftParticipant

* participant_id
* group_gift_id
* participant_name
* amount
* joined_at

## AuthToken

* token_id
* user_id
* provider (google | apple)
* provider_user_id
* access_token (encrypted)
* refresh_token (encrypted)
* expires_at
* created_at

## ChatSession

* session_id
* user_id
* person_id
* message_count
* status (active | completed | fallback)
* created_at
* completed_at

## ChatMessage

* message_id
* session_id
* role (user | assistant)
* content
* created_at

## Notification

* notification_id
* user_id
* event_id
* person_id
* type (30d | 7d | 1d | day_of)
* channel (push)
* status (pending | sent | failed)
* scheduled_at
* sent_at

## Invitation

* invitation_id
* group_gift_id
* invite_token (unique, used in share link)
* created_by (user_id)
* expires_at
* created_at

---

# 13. User Stories

## משתמש כקונה מתנות

* אני רוצה להוסיף אדם חשוב כדי לזכור את האירוע שלו
* אני רוצה להגדיר תקציב כדי לראות הצעות רלוונטיות
* אני רוצה לדבר עם AI כדי לדייק את סוג המתנה
* אני רוצה לקבל 3 הצעות ברורות כדי לא להתלבט יותר מדי
* אני רוצה לשייך מתנה לאדם מסוים
* אני רוצה לקבל ברכה אוטומטית שאוכל לערוך
* אני רוצה לראות מה כבר קניתי בעבר

## משתמש כחבר בקבוצה

* אני רוצה להצטרף למתנה קבוצתית
* אני רוצה לראות כמה כבר נאסף
* אני רוצה לדעת למה מיועדת המתנה
* אני רוצה להשתתף בלי תהליך מסובך

---

# 14. Flow עיקרי

## Flow 1 — יצירת אדם והמלצה ראשונה

1. משתמש מוסיף אדם
2. בוחר תאריך
3. מגדיר תקציב
4. פותח צ’אט AI
5. נוצר פרופיל
6. נשמר אדם במערכת

## Flow 2 — אירוע מתקרב

1. שבוע לפני האירוע נשלחת התראה
2. במסך הבית האדם קופץ לראש הרשימה
3. מוצגות 3 המלצות
4. המשתמש בוחר מתנה
5. מזין כתובת
6. מאשר ברכה
7. משלים הזמנה

## Flow 3 — מתנה קבוצתית

1. משתמש פותח מתנה קבוצתית
2. משתף לינק
3. חברים מצטרפים
4. התקציב מצטבר
5. מוצגות הצעות מתנה
6. נבחרת מתנה

---

# 15. MVP לעומת Future Scope

## MVP

* אנשים ואירועים
* צ’אט AI
* פרופיל אדם
* פיד השראה
* 3 המלצות עיקריות
* ברכה אוטומטית
* התראות
* Timeline
* מתנה קבוצתית בסיסית

## Future Scope

* אינטגרציות לחנויות ורכישה מלאה
* AI שמנתח היסטוריה עמוקה יותר
* סנכרון עם יומן
* המלצות לפי עונות/חגים
* wishlists שיתופיים
* יד 2 / re-gift
* פיד חברתי
* תמיכה רב-לשונית (עברית, ספרדית, ועוד)
* API affiliate לחנויות (Amazon ואחרות)

## שפה / Localization

* MVP: אנגלית בלבד
* Future: תמיכה מרובת שפות (i18n)

## מונטיזציה / Monetization

* MVP: ללא מודל הכנסה פעיל
* Future: עמלות affiliate על קישורי רכישה

---

# 16. מדדי הצלחה

## מדדי שימוש

* מספר אנשים שהתווספו
* מספר אירועים שנשמרו
* מספר שיחות AI שנפתחו
* מספר מתנות שנשמרו

## מדדי מוצר

* אחוז פתיחת התראות
* אחוז בחירה מתוך 3 ההמלצות
* זמן ממוצע מבחירת אדם עד בחירת מתנה
* שימוש חוזר חודשי

## מדדי צמיחה

* כמות מתנות קבוצתיות
* מספר משתמשים שמצטרפים דרך שיתוף
* כמות רכישות/השלמות Flow

---

# 17. טון המוצר והשפה

האפליקציה צריכה להרגיש:

* חכמה
* מודרנית
* נגישה
* אישית
* כיפית אבל לא ילדותית

הטון צריך להיות:

* ידידותי
* ברור
* לא עמוס
* חצי lifestyle, חצי utility

---

# 18. סיכום

Gift Vibes היא אפליקציה שמביאה יחד ניהול אירועים, AI ויזואלי וגילוי מתנות, כדי לפתור בעיה אמיתית שחוזרת אצל כמעט כל משתמש: לזכור בזמן, להבין למי קונים, ולבחור מתנה טובה בלי לבזבז שעות.

המוצר ייחודי בכך שהוא מחבר בין:

* זיכרון ותזמון
* הבנה של האדם
* המלצות AI
* חוויית גילוי מהנה
* אפשרות לשיתופיות חברתית

---

# 19. Engineering Guidelines

## 19.1 General Principles

- Code must be simple, readable, and maintainable
- Avoid over-engineering and unnecessary abstractions
- Prefer clarity over cleverness
- Files should not be too long or too fragmented

---

## 19.2 Frontend (React + Vite + Capacitor)

> The frontend is a **React web application** built with Vite, wrapped as a native mobile app using **Capacitor**. There is no React Native code.

- Use functional components only
- Keep components small and focused
- No complex design patterns or unnecessary abstractions
- Do NOT use heavy UI frameworks

### Component Structure

- Each component lives in its own folder with a matching CSS file:

```
src/
  components/
    PersonCard/
      PersonCard.tsx
      PersonCard.css
    GiftList/
      GiftList.tsx
      GiftList.css

  screens/
    Home/
      HomeScreen.tsx
      HomeScreen.css
    PersonDetails/
      PersonDetailsScreen.tsx
      PersonDetailsScreen.css

  stores/
    user.store.ts
    people.store.ts
    event.store.ts
    chat.store.ts
    gift.store.ts

  services/
    api.ts
    people.api.ts
    chat.api.ts
```

- Component names must be **short but descriptive**
  - Good: `PersonCard`, `GiftList`, `ChatBox`
  - Bad: `GenericContainerComponent`, `DataRenderer`
- Avoid deeply nested components
- Each component has a single, clear responsibility

### State Management

- Use Zustand for global state
- Each store should be small and focused — only relevant state + actions
- Keep local UI state (input focus, modal open) inside the component
- Avoid unnecessary global state

### Styling

- Use CSS files co-located with each component (not a global stylesheet)
- Use Flexbox for layout
- Keep styles simple and readable
- No inline styles except for trivial cases

### Layout

- Mobile-first design
- Clean layout: Header / Content / Bottom Actions
- Consistent spacing and alignment across screens

### API Layer

- All API calls go through `services/` files
- Do NOT call `fetch` directly inside components

### Capacitor Integration

- The web app is packaged using Capacitor for iOS and Android
- Avoid browser-only APIs without a fallback
- Use Capacitor plugins for:
  - Push notifications
  - Local storage
  - Device features as needed

### Comments

- Add comments only when logic is not obvious
- Avoid redundant comments

---

## 19.3 Backend (Node.js + TypeScript)

### Architecture

Use standard layered structure:

```
Routes → Controllers → Services → DB Access Layer
```

### Controllers

- Keep controllers thin
- Only handle request/response + basic validation
- Move business logic to services

### Database Access

- Centralized DB access layer
- No direct DB calls inside controllers

### Error Handling

- Consistent error format across all endpoints
- Do not expose raw DB errors to the client

### File Structure

- Keep files focused and readable
- Avoid files longer than 300–400 lines

---

## 19.4 Code Style

- Use TypeScript strictly — avoid `any` unless absolutely necessary
- Clear, descriptive naming for variables and functions
- No magic numbers or hardcoded values — use named constants

---

## 19.5 Performance

- Avoid unnecessary re-renders on the frontend
- Keep API responses fast and minimal

---

# 20. Database Guidelines

## 20.1 General Principles

- Use PostgreSQL (relational) hosted on **Supabase**
- Connect from Node.js using the standard `pg` library via Supabase's connection string — do NOT use the `@supabase/supabase-js` SDK in the backend
- Use Supabase's **connection pooler** URL (port 6543, Transaction mode) for the backend — not the direct connection (port 5432)
- Prefer simplicity over perfect normalization
- Avoid overly complex schemas
- Design for developer clarity and maintainability

---

## 20.2 Data Modeling

- Avoid excessive normalization
- It is acceptable to duplicate data when it simplifies queries
- Prefer simple one-to-many relationships over many-to-many

---

## 20.3 Many-to-Many Relationships

- Avoid many-to-many unless absolutely necessary
- If needed, keep join tables simple and minimal

---

## 20.4 Table Design

- Each table should have a clear, single responsibility
- Avoid "generic" tables with too many responsibilities
- Keep column names clear and meaningful

---

## 20.5 Performance & Simplicity

- Prefer simple queries over highly optimized but complex ones
- Reduce the number of JOINs where possible
- Store computed or derived values when it simplifies application logic

**Example approach:**
- Instead of complex relations between Users, Events, Gifts, and Contributions
- Prefer simpler structures with some duplicated fields (e.g., `user_name`, `gift_title`)

---

## 20.6 Backend / DB Separation

- Backend (Node.js) is responsible for all business logic
- DB should remain simple and predictable
- Avoid complex logic inside the database (no stored procedures, no triggers in MVP)

---

## 20.7 Supabase Setup

### Environment Variables

```env
DATABASE_URL=postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

### Connection Pool (`db/pool.ts`)

```ts
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
```

### Notes

- Run schema migrations using plain SQL files (no ORM in MVP)
- Use Supabase's **Table Editor** or **SQL Editor** in the dashboard to inspect data during development
- Free tier limits: 500MB storage, 2GB bandwidth, 2 projects — sufficient for MVP

---

# 21. Technical Reference

## 21.1 Project Structure

### Backend

```
src/
  routes/
    auth.routes.ts
    users.routes.ts
    people.routes.ts
    events.routes.ts
    chat.routes.ts
    gifts.routes.ts
    orders.routes.ts
    groupGifts.routes.ts
    notifications.routes.ts
    timeline.routes.ts
  controllers/
    AuthController.ts
    UserController.ts
    PeopleController.ts
    EventsController.ts
    ChatController.ts
    GiftsController.ts
    OrdersController.ts
    GroupGiftsController.ts
    NotificationsController.ts
    TimelineController.ts
  services/
    auth/
    people/
    events/
    chat/
    gifts/
    orders/
    groupGifts/
    notifications/
  db/
    pool.ts
    repositories/
  middleware/
    auth.ts
    errorHandler.ts
    validate.ts
  types/
  utils/
  app.ts
  server.ts
```

### Frontend

```
src/
  components/
    PersonCard/
      PersonCard.tsx
      PersonCard.css
    GiftList/
      GiftList.tsx
      GiftList.css
    ChatBox/
      ChatBox.tsx
      ChatBox.css
    (... one folder per component)

  screens/
    Home/
      HomeScreen.tsx
      HomeScreen.css
    PersonDetails/
      PersonDetailsScreen.tsx
      PersonDetailsScreen.css
    (... one folder per screen)

  stores/
    user.store.ts
    people.store.ts
    event.store.ts
    chat.store.ts
    gift.store.ts

  services/
    api.ts
    people.api.ts
    events.api.ts
    chat.api.ts
    gifts.api.ts
    orders.api.ts
    groupGifts.api.ts
    notifications.api.ts
    timeline.api.ts
```

---

## 21.2 API Conventions

### Base URL

All endpoints are prefixed with `/api`.

### Authentication

All endpoints **except** `/api/auth/*` and `GET /api/invitations/:inviteToken` require a Bearer token:

```
Authorization: Bearer <jwt_token>
```

### HTTP Methods

| Method | Usage |
|---|---|
| `GET` | Fetch resource(s) |
| `POST` | Create a new resource |
| `PATCH` | Partial update |
| `DELETE` | Remove a resource |

### Naming Conventions

- Routes use **kebab-case** and plural nouns: `/api/people`, `/api/group-gifts`
- Query params use **snake_case**: `?person_id=p1&vibe_tag=iconic`
- JSON body and response fields use **camelCase**: `fullName`, `budgetMin`

### Response Shape — Success (object)

```json
{ "data": {} }
```

### Response Shape — Success (list)

```json
{
  "data": [],
  "meta": {
    "limit": 20,
    "offset": 0,
    "total": 100
  }
}
```

### Response Shape — Error

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Budget is required"
  }
}
```

### HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK |
| `201` | Created |
| `400` | Bad request / validation error |
| `401` | Unauthorized (missing/invalid token) |
| `403` | Forbidden (valid token, wrong permissions) |
| `404` | Resource not found |
| `500` | Internal server error |

### Pagination

All list endpoints accept `?limit=20&offset=0` and return `meta.total`.

### Sorting

```
?sort=created_at_desc
?sort=event_date_asc
?sort=price_asc
```

### Status Enums

| Entity | Values |
|---|---|
| `ChatSession.status` | `active` \| `completed` \| `fallback` |
| `Order.order_status` | `pending_purchase` \| `purchased` \| `cancelled` |
| `GroupGift.status` | `active` \| `completed` \| `cancelled` |

---

## 21.3 Zustand ↔ API Mapping

| Store | API Endpoints |
|---|---|
| `userStore` | `/api/auth`, `/api/users/me` |
| `peopleStore` | `/api/people` |
| `eventStore` | `/api/events` |
| `chatStore` | `/api/chat` |
| `giftStore` | `/api/gifts`, `/api/orders`, `/api/timeline` |

---

## 21.4 Technical Flow: User Clicks "Find Gift"

```
1. FE calls POST /api/chat/start
2. BE creates ChatSession in DB
3. BE sends system prompt + user context to OpenAI
4. BE stores ChatMessage (role: assistant) in DB
5. FE displays AI response
6. Loop until session ends (max 10 messages)
7. BE generates PersonProfileAI from session
8. FE redirects to Gift Suggestions screen
```

---

## 21.5 AI Integration

### System Prompt Template

```
You are a gift recommendation assistant helping users find the perfect gift
for someone they care about. Ask questions to understand the recipient's
personality, interests, and the occasion. Keep the conversation friendly,
concise, and focused.
```

### User Context Payload (sent to OpenAI)

```json
{
  "relationship": "girlfriend",
  "budget": 100,
  "interests": ["fashion", "travel"]
}
```

---

## 21.6 State Management (Zustand)

Global stores:

| Store | Responsibility |
|---|---|
| `userStore` | Authenticated user, preferences |
| `peopleStore` | List of people, selected person |
| `eventStore` | Events per person, countdowns |
| `chatStore` | Active chat session, messages |
| `giftStore` | Suggestions, saved gifts, inspiration feed |

Rules:
- Keep local component state for UI-only concerns (e.g., input focus, modal open)
- Use global store only when data is shared across screens

---

## 21.7 DB Simplification Decisions

To reduce JOIN complexity and keep queries fast:

| Table | Decision |
|---|---|
| `Order` | Stores `gift_title` as a duplicate of `Gift.title` |
| `GroupGiftParticipant` | Stores `participant_name` directly — no join to `User` |

---

# 22. Full API Reference

## 22.1 Auth

### POST `/api/auth/google`
Login or register with Google.

Request:
```json
{ "id_token": "google-token" }
```
Response:
```json
{
  "data": {
    "access_token": "jwt",
    "user": {
      "user_id": "u1",
      "full_name": "Gilad",
      "email": "gilad@example.com",
      "provider": "google",
      "is_new_user": true
    }
  }
}
```

### POST `/api/auth/apple`

Request:
```json
{ "identity_token": "apple-token" }
```
Response:
```json
{
  "data": {
    "access_token": "jwt",
    "user": {
      "user_id": "u1",
      "full_name": "Gilad",
      "email": "gilad@example.com",
      "provider": "apple",
      "is_new_user": false
    }
  }
}
```

### POST `/api/auth/logout`

Request: `{}`  
Response: `{ "data": { "success": true } }`

---

## 22.2 User

### GET `/api/users/me`
```json
{
  "data": {
    "user_id": "u1",
    "full_name": "Gilad",
    "email": "gilad@example.com",
    "phone": null,
    "preferences": { "language": "en", "theme": "light" },
    "notification_settings": { "push_enabled": true }
  }
}
```

### PATCH `/api/users/me`

Request:
```json
{ "full_name": "Gilad D", "phone": "0501234567", "preferences": { "language": "en" } }
```
Response: `{ "data": { "updated": true } }`

### POST `/api/users/me/push-token`
Save FCM token.

Request:
```json
{ "push_token": "fcm-token", "platform": "ios" }
```
Response: `{ "data": { "saved": true } }`

---

## 22.3 People

### GET `/api/people`
Query: `?search=john&sort=next_event&limit=20&offset=0`
```json
{
  "data": [
    {
      "person_id": "p1",
      "full_name": "John",
      "photo_url": null,
      "relationship_type": "friend",
      "budget_min": 50,
      "budget_max": 100,
      "next_event": {
        "event_id": "e1",
        "event_type": "birthday",
        "event_date": "2026-06-10",
        "days_left": 12
      },
      "profile_ai_status": "completed"
    }
  ],
  "meta": { "total": 1 }
}
```

### POST `/api/people`

Request:
```json
{
  "full_name": "John",
  "photo_url": null,
  "relationship_type": "friend",
  "notes": "Likes gadgets",
  "budget_min": 50,
  "budget_max": 100,
  "shipping_address": "Tel Aviv",
  "delivery_preferences": "home delivery"
}
```
Response: `{ "data": { "person_id": "p1" } }`

### GET `/api/people/:personId`
```json
{
  "data": {
    "person_id": "p1",
    "full_name": "John",
    "photo_url": null,
    "relationship_type": "friend",
    "notes": "Likes gadgets",
    "budget_min": 50,
    "budget_max": 100,
    "shipping_address": "Tel Aviv",
    "delivery_preferences": "home delivery",
    "profile_ai": {
      "summary": "Tech lover with minimalist taste",
      "interests": ["gadgets", "travel"],
      "dislikes": ["clothes"],
      "gift_style": "practical",
      "greeting_tone": "warm",
      "suggested_budget": 90
    }
  }
}
```

### PATCH `/api/people/:personId`

Request:
```json
{ "budget_min": 80, "budget_max": 150, "notes": "Prefer useful gifts" }
```
Response: `{ "data": { "updated": true } }`

### DELETE `/api/people/:personId`
Response: `{ "data": { "deleted": true } }`

### GET `/api/people/:personId/history`
```json
{
  "data": [
    {
      "order_id": "o1",
      "gift_title": "AirTag",
      "budget_used": 99,
      "event_type": "birthday",
      "created_at": "2026-03-01T10:00:00Z",
      "order_status": "purchased"
    }
  ]
}
```

---

## 22.4 Events

### GET `/api/events`
Query: `?person_id=p1&upcoming=true`
```json
{
  "data": [
    {
      "event_id": "e1",
      "person_id": "p1",
      "event_type": "birthday",
      "event_date": "2026-06-10",
      "recurrence": "yearly",
      "days_left": 12
    }
  ]
}
```

### POST `/api/events`

Request:
```json
{
  "person_id": "p1",
  "event_type": "birthday",
  "event_date": "2026-06-10",
  "recurrence": "yearly",
  "reminder_settings": { "days_before": [30, 7, 1, 0] }
}
```
Response: `{ "data": { "event_id": "e1" } }`

### GET `/api/events/:eventId`
### PATCH `/api/events/:eventId`
### DELETE `/api/events/:eventId`

---

## 22.5 Home

### GET `/api/home`
```json
{
  "data": {
    "greeting_name": "Gilad",
    "upcoming_people": [
      {
        "person_id": "p1",
        "full_name": "John",
        "event_type": "birthday",
        "event_date": "2026-06-10",
        "days_left": 7,
        "highlighted": true,
        "top_suggestions": [
          { "gift_id": "g1", "title": "AirTag", "price": 99 }
        ]
      }
    ],
    "notifications": [
      {
        "notification_id": "n1",
        "type": "7d",
        "message": "John's birthday is in 7 days"
      }
    ],
    "quick_actions": ["add_person", "open_inspiration", "find_gift"]
  }
}
```

---

## 22.6 Chat / AI

### POST `/api/chat/start`
Opens a new chat session.

Request:
```json
{
  "person_id": "p1",
  "event_id": "e1",
  "budget_min": 50,
  "budget_max": 100
}
```
Response:
```json
{
  "data": {
    "session_id": "s1",
    "status": "active",
    "message_count": 1,
    "assistant_message": {
      "message_id": "m1",
      "role": "assistant",
      "content": "Tell me a bit about John. What does he enjoy?"
    }
  }
}
```

### GET `/api/chat/sessions/:sessionId`
```json
{
  "data": {
    "session_id": "s1",
    "status": "active",
    "message_count": 3,
    "messages": [
      { "message_id": "m1", "role": "assistant", "content": "Tell me a bit about John." },
      { "message_id": "m2", "role": "user", "content": "He likes travel and gadgets." }
    ]
  }
}
```

### POST `/api/chat/sessions/:sessionId/messages`

Request:
```json
{ "content": "He also likes coffee and practical gifts." }
```
Response:
```json
{
  "data": {
    "session_id": "s1",
    "status": "active",
    "message_count": 5,
    "assistant_message": {
      "message_id": "m5",
      "role": "assistant",
      "content": "Great. What's the budget range for this gift?"
    }
  }
}
```

### POST `/api/chat/sessions/:sessionId/complete`
Closes session and generates PersonProfileAI.

Response:
```json
{
  "data": {
    "session_id": "s1",
    "status": "completed",
    "profile": {
      "summary": "John appreciates practical travel-friendly tech gifts.",
      "interests": ["travel", "gadgets", "coffee"],
      "dislikes": [],
      "gift_style": "practical",
      "greeting_tone": "warm",
      "suggested_budget": 100
    }
  }
}
```

### GET `/api/people/:personId/profile-ai`
```json
{
  "data": {
    "summary": "John appreciates practical travel-friendly tech gifts.",
    "interests": ["travel", "gadgets", "coffee"],
    "dislikes": [],
    "gift_style": "practical",
    "greeting_tone": "warm",
    "suggested_budget": 100,
    "updated_at": "2026-04-14T10:00:00Z"
  }
}
```

---

## 22.7 Gifts

### GET `/api/gifts/inspiration`
Query: `?category=&vibe_tag=iconic&budget_max=150&limit=20&offset=0`
```json
{
  "data": [
    {
      "gift_id": "g1",
      "title": "AirTag",
      "description": "Track everyday items",
      "image_url": "https://...",
      "price": 99,
      "vibe_tag": "iconic",
      "category": "tech",
      "vendor_link": "https://amazon.com/..."
    }
  ],
  "meta": { "total": 100 }
}
```

### GET `/api/gifts/suggestions`
Query: `?person_id=p1&event_id=e1`
```json
{
  "data": {
    "person": { "person_id": "p1", "full_name": "John" },
    "event": { "event_id": "e1", "event_type": "birthday" },
    "budget": { "min": 50, "max": 100 },
    "ai_summary": "Practical gifts with travel vibe",
    "top_suggestions": [
      {
        "gift_id": "g1",
        "title": "AirTag",
        "price": 99,
        "image_url": "https://...",
        "vibe_tag": "iconic",
        "reason": "Useful for travel and everyday use"
      }
    ],
    "more_available": true
  }
}
```

### GET `/api/gifts/:giftId`

### POST `/api/gifts/:giftId/save`
Request: `{ "person_id": "p1" }`  
Response: `{ "data": { "saved_gift_id": "sg1" } }`

### DELETE `/api/gifts/:giftId/save`
Query: `?person_id=p1`

### GET `/api/gifts/saved`
Query: `?person_id=p1`

---

## 22.8 Greetings

### POST `/api/greetings/generate`
Request:
```json
{ "person_id": "p1", "event_id": "e1", "tone": "warm" }
```
Response:
```json
{ "data": { "message": "Happy birthday John! Wishing you an amazing year ahead." } }
```

### POST `/api/greetings/rewrite`
Request:
```json
{ "message": "Happy birthday John!", "tone": "funny" }
```
Response:
```json
{ "data": { "message": "Happy birthday John! Try not to level up too hard this year." } }
```

---

## 22.9 Orders

> MVP: Orders record purchase intent only. No payment processing in-app.

### POST `/api/orders`

Request:
```json
{
  "person_id": "p1",
  "event_id": "e1",
  "gift_id": "g1",
  "gift_title": "AirTag",
  "budget_used": 99,
  "delivery_address": "Tel Aviv",
  "delivery_time": "evening",
  "card_message": "Happy birthday!",
  "vendor_link": "https://amazon.com/...",
  "order_status": "pending_purchase"
}
```
Response:
```json
{ "data": { "order_id": "o1", "vendor_link": "https://amazon.com/..." } }
```

### PATCH `/api/orders/:orderId/confirm-purchased`
Request: `{ "order_status": "purchased" }`  
Response: `{ "data": { "updated": true } }`

### GET `/api/orders/:orderId`
### GET `/api/orders`
Query: `?person_id=p1&status=purchased`

---

## 22.10 Group Gifts

### POST `/api/group-gifts`
Request:
```json
{ "person_id": "p1", "event_id": "e1", "target_amount": 500 }
```
Response:
```json
{ "data": { "group_gift_id": "gg1", "invite_link": "https://app.com/invite/abc123" } }
```

### GET `/api/group-gifts/:groupGiftId`
```json
{
  "data": {
    "group_gift_id": "gg1",
    "person_id": "p1",
    "event_id": "e1",
    "target_amount": 500,
    "current_amount": 220,
    "status": "active",
    "participants": [
      {
        "participant_id": "gp1",
        "participant_name": "Dana",
        "amount": 100,
        "joined_at": "2026-04-14T10:00:00Z"
      }
    ]
  }
}
```

### POST `/api/group-gifts/:groupGiftId/participants`
Request: `{ "participant_name": "Dana", "amount": 100 }`  
Response: `{ "data": { "participant_id": "gp1", "current_amount": 220 } }`

### GET `/api/invitations/:inviteToken` *(public — no auth required)*
```json
{
  "data": {
    "group_gift_id": "gg1",
    "person_name": "John",
    "event_type": "birthday",
    "target_amount": 500,
    "current_amount": 220,
    "status": "active"
  }
}
```

### POST `/api/invitations/:inviteToken/join` *(public — no auth required)*
Request: `{ "participant_name": "Dana", "amount": 100 }`  
Response: `{ "data": { "joined": true, "current_amount": 320 } }`

---

## 22.11 Notifications

### GET `/api/notifications`
```json
{
  "data": [
    {
      "notification_id": "n1",
      "type": "7d",
      "channel": "push",
      "status": "sent",
      "scheduled_at": "2026-04-20T08:00:00Z",
      "sent_at": "2026-04-20T08:00:01Z",
      "person": { "person_id": "p1", "full_name": "John" }
    }
  ]
}
```

### PATCH `/api/notifications/settings`
Request: `{ "push_enabled": true, "days_before": [30, 7, 1, 0] }`  
Response: `{ "data": { "updated": true } }`

---

## 22.12 Timeline

### GET `/api/timeline`
Query: `?person_id=p1&month=2026-04&event_type=birthday&limit=20&offset=0`
```json
{
  "data": [
    {
      "order_id": "o1",
      "person_id": "p1",
      "person_name": "John",
      "gift_id": "g1",
      "gift_title": "AirTag",
      "budget_used": 99,
      "event_type": "birthday",
      "is_group_gift": false,
      "order_status": "purchased",
      "created_at": "2026-04-01T10:00:00Z"
    }
  ],
  "meta": { "total": 1 }
}
```

---

# 23. Screen → API Mapping

| Screen | Endpoints |
|---|---|
| Auth / Onboarding | `POST /api/auth/google`, `POST /api/auth/apple`, `GET /api/users/me`, `POST /api/users/me/push-token` |
| Home | `GET /api/home`, `GET /api/notifications` |
| People & Events | `GET/POST /api/people`, `PATCH/DELETE /api/people/:personId`, `GET/POST /api/events`, `PATCH/DELETE /api/events/:eventId` |
| Person Profile | `GET /api/people/:personId`, `GET /api/people/:personId/profile-ai`, `GET /api/people/:personId/history` |
| AI Chat | `POST /api/chat/start`, `GET /api/chat/sessions/:sessionId`, `POST /api/chat/sessions/:sessionId/messages`, `POST /api/chat/sessions/:sessionId/complete` |
| Inspiration Board | `GET /api/gifts/inspiration`, `POST/DELETE /api/gifts/:giftId/save`, `GET /api/gifts/saved` |
| Gift Suggestions | `GET /api/gifts/suggestions`, `GET /api/gifts/:giftId` |
| Order | `POST /api/orders`, `PATCH /api/orders/:orderId/confirm-purchased`, `GET /api/orders/:orderId` |
| Group Gift | `POST /api/group-gifts`, `GET /api/group-gifts/:groupGiftId`, `POST /api/group-gifts/:groupGiftId/participants`, `GET/POST /api/invitations/:inviteToken` |
| Timeline | `GET /api/timeline` |

---

# 24. Open Decisions

## 24.1 Contacts Sync (MVP)

**Decision: Add manually only in MVP.**

- No device contacts import in MVP
- Users enter name, relationship, budget manually
- Contacts sync (iOS / Android permission flow) deferred to Future Scope

---





