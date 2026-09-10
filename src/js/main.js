// Google Sheets Integration WebApp Endpoint URL
// Paste your Google Apps Script Web App URL below to send live Prayer Requests & Testimonies directly to your Google Sheet / Excel spreadsheet.
let GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyEZWH3p5lsl0dsiUZDCHpij5l9BusPU-7gSZJnxSFiDjkiP9RUOcU6OPNT0SS7HsqbPw/exec';

async function sendToGoogleSheet(payload) {
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
    console.log('[Google Sheets Integration] Endpoint URL not set yet. Data saved locally:', payload);
    return;
  }

  try {
    await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log('[Google Sheets Integration] Data sent successfully for:', payload.formType);
  } catch (err) {
    console.warn('[Google Sheets Integration] Network error:', err);
  }
}

async function fetchApprovedTestimoniesFromSheet() {
  if (!GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_WEBAPP_URL.includes('YOUR_GOOGLE_APPS_SCRIPT_URL')) {
    return null;
  }
  try {
    const res = await fetch(GOOGLE_SHEET_WEBAPP_URL);
    if (!res.ok) return null;
    const json = await res.json();
    return json.testimonies && Array.isArray(json.testimonies) ? json.testimonies : null;
  } catch (err) {
    console.warn('[Google Sheets Integration] Could not fetch approved testimonies:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// 1. DATA MODULES
// -----------------------------------------------------------------------------

const dailyVerses = [
  {"day": 1, "date": "Jan 01", "reference": "Genesis 1:1", "text": "In the beginning God created the heavens and the earth."},
  {"day": 2, "date": "Jan 02", "reference": "Jeremiah 29:11", "text": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."},
  {"day": 3, "date": "Jan 03", "reference": "Philippians 4:13", "text": "I can do all things through Christ who strengthens me."},
  {"day": 4, "date": "Jan 04", "reference": "Psalm 23:1", "text": "The Lord is my shepherd; I shall not want."},
  {"day": 5, "date": "Jan 05", "reference": "Proverbs 3:5-6", "text": "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."},
  {"day": 6, "date": "Jan 06", "reference": "Isaiah 40:31", "text": "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."},
  {"day": 7, "date": "Jan 07", "reference": "Romans 8:28", "text": "And we know that in all things God works for the good of those who love him, who have been called according to his purpose."},
  {"day": 8, "date": "Jan 08", "reference": "Joshua 1:9", "text": "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."},
  {"day": 9, "date": "Jan 09", "reference": "Psalm 46:10", "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."},
  {"day": 10, "date": "Jan 10", "reference": "Matthew 6:33", "text": "But seek first his kingdom and his righteousness, and all these things will be given to you as well."},
  {"day": 11, "date": "Jan 11", "reference": "John 3:16", "text": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."},
  {"day": 12, "date": "Jan 12", "reference": "2 Chronicles 7:14", "text": "If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven."},
  {"day": 13, "date": "Jan 13", "reference": "Psalm 119:105", "text": "Your word is a lamp for my feet, a light on my path."},
  {"day": 14, "date": "Jan 14", "reference": "Romans 12:2", "text": "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."},
  {"day": 15, "date": "Jan 15", "reference": "1 Corinthians 13:13", "text": "And now these three remain: faith, hope and love. But the greatest of these is love."},
  {"day": 16, "date": "Jan 16", "reference": "Galatians 5:22-23", "text": "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control."},
  {"day": 17, "date": "Jan 17", "reference": "Psalm 100:5", "text": "For the Lord is good and his love endures forever; his faithfulness continues through all generations."},
  {"day": 18, "date": "Jan 18", "reference": "Ephesians 2:8-9", "text": "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God."},
  {"day": 19, "date": "Jan 19", "reference": "Hebrews 11:1", "text": "Now faith is confidence in what we hope for and assurance about what we do not see."},
  {"day": 20, "date": "Jan 20", "reference": "James 1:5", "text": "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you."},
  {"day": 21, "date": "Jan 21", "reference": "1 Peter 5:7", "text": "Cast all your anxiety on him because he cares for you."},
  {"day": 22, "date": "Jan 22", "reference": "1 John 4:19", "text": "We love because he first loved us."},
  {"day": 23, "date": "Jan 23", "reference": "Revelation 21:4", "text": "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain."},
  {"day": 24, "date": "Jan 24", "reference": "Psalm 27:1", "text": "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?"},
  {"day": 25, "date": "Jan 25", "reference": "Isaiah 41:10", "text": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you."},
  {"day": 26, "date": "Jan 26", "reference": "Matthew 11:28", "text": "Come to me, all you who are weary and burdened, and I will give you rest."},
  {"day": 27, "date": "Jan 27", "reference": "John 14:6", "text": "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'"},
  {"day": 28, "date": "Jan 28", "reference": "Romans 8:31", "text": "What, then, shall we say in response to these things? If God is for us, who can be against us?"},
  {"day": 29, "date": "Jan 29", "reference": "2 Corinthians 5:17", "text": "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!"},
  {"day": 30, "date": "Jan 30", "reference": "Philippians 4:6-7", "text": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."},
  {"day": 31, "date": "Jan 31", "reference": "Colossians 3:23", "text": "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."},
  {"day": 32, "date": "Feb 01", "reference": "Psalm 91:1-2", "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, 'He is my refuge and my fortress, my God, in whom I trust.'"},
  {"day": 33, "date": "Feb 02", "reference": "Proverbs 16:3", "text": "Commit to the Lord whatever you do, and he will establish your plans."},
  {"day": 34, "date": "Feb 03", "reference": "Isaiah 26:3", "text": "You will keep in perfect peace those whose minds are steadfast, because they trust in you."},
  {"day": 35, "date": "Feb 04", "reference": "Micah 6:8", "text": "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."},
  {"day": 36, "date": "Feb 05", "reference": "Matthew 5:16", "text": "In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven."},
  {"day": 37, "date": "Feb 06", "reference": "Mark 10:27", "text": "Jesus looked at them and said, 'With man this is impossible, but not with God; all things are possible with God.'"},
  {"day": 38, "date": "Feb 07", "reference": "Luke 1:37", "text": "For no word from God will ever fail."},
  {"day": 39, "date": "Feb 08", "reference": "John 8:12", "text": "When Jesus spoke again to the people, he said, 'I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.'"},
  {"day": 40, "date": "Feb 09", "reference": "Romans 15:13", "text": "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit."},
  {"day": 41, "date": "Feb 10", "reference": "1 Corinthians 16:14", "text": "Do everything in love."},
  {"day": 42, "date": "Feb 11", "reference": "2 Corinthians 12:9", "text": "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'"},
  {"day": 43, "date": "Feb 12", "reference": "Ephesians 6:10", "text": "Finally, be strong in the Lord and in his mighty power."},
  {"day": 44, "date": "Feb 13", "reference": "Philippians 4:19", "text": "And my God will meet all your needs according to the riches of his glory in Christ Jesus."},
  {"day": 45, "date": "Feb 14", "reference": "1 John 4:8", "text": "Whoever does not love does not know God, because God is love."},
  {"day": 46, "date": "Feb 15", "reference": "Psalm 34:8", "text": "Taste and see that the Lord is good; blessed is the one who takes refuge in him."},
  {"day": 47, "date": "Feb 16", "reference": "Psalm 121:1-2", "text": "I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth."},
  {"day": 48, "date": "Feb 17", "reference": "Proverbs 4:23", "text": "Above all else, guard your heart, for everything you do flows from it."},
  {"day": 49, "date": "Feb 18", "reference": "Isaiah 43:19", "text": "See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland."},
  {"day": 50, "date": "Feb 19", "reference": "Jeremiah 33:3", "text": "Call to me and I will answer you and tell you great and unsearchable things you do not know."},
  {"day": 51, "date": "Feb 20", "reference": "Lamentations 3:22-23", "text": "Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."},
  {"day": 52, "date": "Feb 21", "reference": "Zephaniah 3:17", "text": "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing."},
  {"day": 53, "date": "Feb 22", "reference": "Matthew 28:20", "text": "And surely I am with you always, to the very end of the age."},
  {"day": 54, "date": "Feb 23", "reference": "John 10:10", "text": "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full."},
  {"day": 55, "date": "Feb 24", "reference": "John 15:5", "text": "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."},
  {"day": 56, "date": "Feb 25", "reference": "Romans 5:8", "text": "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us."},
  {"day": 57, "date": "Feb 26", "reference": "1 Corinthians 10:13", "text": "God is faithful; he will not let you be tempted beyond what you can bear."},
  {"day": 58, "date": "Feb 27", "reference": "Galatians 2:20", "text": "I have been crucified with Christ and I no longer live, but Christ lives in me."},
  {"day": 59, "date": "Feb 28", "reference": "Ephesians 3:20", "text": "Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us."},
  {"day": 60, "date": "Mar 01", "reference": "Psalm 118:24", "text": "This is the day the Lord has made; let us rejoice and be glad in it."},
  {"day": 61, "date": "Mar 02", "reference": "Psalm 147:3", "text": "He heals the brokenhearted and binds up their wounds."},
  {"day": 62, "date": "Mar 03", "reference": "Proverbs 18:10", "text": "The name of the Lord is a fortified tower; the righteous run to it and are safe."},
  {"day": 63, "date": "Mar 04", "reference": "Isaiah 54:17", "text": "'No weapon forged against you will prevail, and you will refute every tongue that accuses you. This is the heritage of the servants of the Lord.'"},
  {"day": 64, "date": "Mar 05", "reference": "Jeremiah 17:7", "text": "But blessed is the one who trusts in the Lord, whose confidence is in him."},
  {"day": 65, "date": "Mar 06", "reference": "Matthew 7:7", "text": "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."},
  {"day": 66, "date": "Mar 07", "reference": "Luke 6:38", "text": "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap."},
  {"day": 67, "date": "Mar 08", "reference": "John 16:33", "text": "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world."},
  {"day": 68, "date": "Mar 09", "reference": "Romans 10:9", "text": "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved."},
  {"day": 69, "date": "Mar 10", "reference": "2 Corinthians 9:7", "text": "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."},
  {"day": 70, "date": "Mar 11", "reference": "Ephesians 4:32", "text": "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."},
  {"day": 71, "date": "Mar 12", "reference": "Colossians 3:15", "text": "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful."},
  {"day": 72, "date": "Mar 13", "reference": "1 Thessalonians 5:16-18", "text": "Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus."},
  {"day": 73, "date": "Mar 14", "reference": "2 Timothy 1:7", "text": "For God has not given us a spirit of fear, but of power and of love and of a sound mind."},
  {"day": 74, "date": "Mar 15", "reference": "Hebrews 4:16", "text": "Let us then approach God’s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need."},
  {"day": 75, "date": "Mar 16", "reference": "Hebrews 13:8", "text": "Jesus Christ is the same yesterday and today and forever."},
  {"day": 76, "date": "Mar 17", "reference": "James 4:8", "text": "Come near to God and he will come near to you."},
  {"day": 77, "date": "Mar 18", "reference": "1 Peter 2:9", "text": "But you are a chosen people, a royal priesthood, a holy nation, God’s special possession."},
  {"day": 78, "date": "Mar 19", "reference": "1 John 1:9", "text": "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."},
  {"day": 79, "date": "Mar 20", "reference": "Psalm 19:14", "text": "May these words of my mouth and this meditation of my heart be pleasing in your sight, Lord, my Rock and my Redeemer."},
  {"day": 80, "date": "Mar 21", "reference": "Psalm 37:4", "text": "Take delight in the Lord, and he will give you the desires of your heart."},
  {"day": 81, "date": "Mar 22", "reference": "Psalm 139:14", "text": "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well."},
  {"day": 82, "date": "Mar 23", "reference": "Proverbs 3:9-10", "text": "Honor the Lord with your wealth, with the firstfruits of all your crops; then your barns will be filled to overflowing."},
  {"day": 83, "date": "Mar 24", "reference": "Isaiah 9:6", "text": "For to us a child is born, to us a son is given, and the government will be on his shoulders. And he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."},
  {"day": 84, "date": "Mar 25", "reference": "Isaiah 53:5", "text": "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed."},
  {"day": 85, "date": "Mar 26", "reference": "Matthew 18:20", "text": "For where two or three gather in my name, there am I with them."},
  {"day": 86, "date": "Mar 27", "reference": "Mark 11:24", "text": "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours."},
  {"day": 87, "date": "Mar 28", "reference": "Luke 10:19", "text": "I have given you authority to trample on snakes and scorpions and to overcome all the power of the enemy; nothing will harm you."},
  {"day": 88, "date": "Mar 29", "reference": "John 11:25", "text": "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'"},
  {"day": 89, "date": "Mar 30", "reference": "Acts 1:8", "text": "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."},
  {"day": 90, "date": "Mar 31", "reference": "Romans 1:16", "text": "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes."},
  {"day": 91, "date": "Apr 01", "reference": "Psalm 1:1-2", "text": "Blessed is the one who does not walk in step with the wicked... but whose delight is in the law of the Lord."},
  {"day": 92, "date": "Apr 02", "reference": "Psalm 62:8", "text": "Trust in him at all times, you people; pour out your hearts to him, for God is our refuge."},
  {"day": 93, "date": "Apr 03", "reference": "Psalm 103:1-2", "text": "Praise the Lord, my soul; all my inmost being, praise his holy name."},
  {"day": 94, "date": "Apr 04", "reference": "Proverbs 27:17", "text": "As iron sharpens iron, so one person sharpens another."},
  {"day": 95, "date": "Apr 05", "reference": "Isaiah 40:29", "text": "He gives strength to the weary and increases the power of the weak."},
  {"day": 96, "date": "Apr 06", "reference": "Jeremiah 32:27", "text": "'I am the Lord, the God of all mankind. Is anything too hard for me?'"},
  {"day": 97, "date": "Apr 07", "reference": "Ezekiel 36:26", "text": "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh."},
  {"day": 98, "date": "Apr 08", "reference": "Joel 2:28", "text": "And afterward, I will pour out my Spirit on all people. Your sons and daughters will prophesy."},
  {"day": 99, "date": "Apr 09", "reference": "Malachi 3:10", "text": "Bring the whole tithe into the storehouse... test me in this and see if I will not throw open the floodgates of heaven."},
  {"day": 100, "date": "Apr 10", "reference": "Matthew 19:26", "text": "Jesus looked at them and said, 'With man this is impossible, but with God all things are possible.'"},
  {"day": 101, "date": "Apr 11", "reference": "Mark 9:23", "text": "'Everything is possible for one who believes.'"},
  {"day": 102, "date": "Apr 12", "reference": "Luke 12:32", "text": "Do not be afraid, little flock, for your Father has been pleased to give you the kingdom."},
  {"day": 103, "date": "Apr 13", "reference": "John 4:24", "text": "God is spirit, and his worshipers must worship in the Spirit and in truth."},
  {"day": 104, "date": "Apr 14", "reference": "Acts 4:12", "text": "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved."},
  {"day": 105, "date": "Apr 15", "reference": "Romans 12:12", "text": "Be joyful in hope, patient in affliction, faithful in prayer."},
  {"day": 106, "date": "Apr 16", "reference": "1 Corinthians 15:57", "text": "But thanks be to God! He gives us the victory through our Lord Jesus Christ."},
  {"day": 107, "date": "Apr 17", "reference": "2 Corinthians 3:17", "text": "Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom."},
  {"day": 108, "date": "Apr 18", "reference": "Galatians 6:9", "text": "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."},
  {"day": 109, "date": "Apr 19", "reference": "Ephesians 1:3", "text": "Praise be to the God and Father of our Lord Jesus Christ, who has blessed us in the heavenly realms with every spiritual blessing in Christ."},
  {"day": 110, "date": "Apr 20", "reference": "Philippians 2:10-11", "text": "That at the name of Jesus every knee should bow, in heaven and on earth and under the earth, and every tongue acknowledge that Jesus Christ is Lord."},
  {"day": 111, "date": "Apr 21", "reference": "Colossians 2:7", "text": "Rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness."},
  {"day": 112, "date": "Apr 22", "reference": "1 Thessalonians 5:11", "text": "Therefore encourage one another and build each other up, just as in fact you are doing."},
  {"day": 113, "date": "Apr 23", "reference": "2 Thessalonians 3:3", "text": "But the Lord is faithful, and he will strengthen you and protect you from the evil one."},
  {"day": 114, "date": "Apr 24", "reference": "1 Timothy 6:12", "text": "Fight the good fight of the faith. Take hold of the eternal life to which you were called."},
  {"day": 115, "date": "Apr 25", "reference": "Hebrews 12:1-2", "text": "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith."},
  {"day": 116, "date": "Apr 26", "reference": "James 1:17", "text": "Every good and perfect gift is from above, coming down from the Father of the heavenly lights."},
  {"day": 117, "date": "Apr 27", "reference": "1 Peter 1:3", "text": "Praise be to the God and Father of our Lord Jesus Christ! In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ."},
  {"day": 118, "date": "Apr 28", "reference": "1 John 5:4", "text": "For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith."},
  {"day": 119, "date": "Apr 29", "reference": "Jude 1:24-25", "text": "To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Savior be glory."},
  {"day": 120, "date": "Apr 30", "reference": "Revelation 3:20", "text": "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me."},
  {"day": 244, "date": "Sep 01", "reference": "Psalm 103:1", "text": "Praise the Lord, my soul; all my inmost being, praise his holy name."},
  {"day": 245, "date": "Sep 02", "reference": "Proverbs 3:5", "text": "Trust in the Lord with all your heart and lean not on your own understanding."},
  {"day": 246, "date": "Sep 03", "reference": "Isaiah 40:29", "text": "He gives strength to the weary and increases the power of the weak."},
  {"day": 247, "date": "Sep 04", "reference": "Jeremiah 29:11", "text": "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."},
  {"day": 248, "date": "Sep 05", "reference": "Matthew 6:33", "text": "But seek first his kingdom and his righteousness, and all these things will be given to you as well."},
  {"day": 249, "date": "Sep 06", "reference": "Romans 8:28", "text": "And we know that in all things God works for the good of those who love him."},
  {"day": 250, "date": "Sep 07", "reference": "Psalm 126:3", "text": "The Lord has done great things for us, and we are filled with joy."},
  {"day": 251, "date": "Sep 08", "reference": "Isaiah 43:2", "text": "When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you."},
  {"day": 252, "date": "Sep 09", "reference": "Psalm 91:11", "text": "For he will command his angels concerning you to guard you in all your ways."},
  {"day": 253, "date": "Sep 10", "reference": "Isaiah 40:31", "text": "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."},
  {"day": 254, "date": "Sep 11", "reference": "Psalm 121:7-8", "text": "The Lord will keep you from all harm—he will watch over your life; the Lord will watch over your coming and going both now and forevermore."},
  {"day": 255, "date": "Sep 12", "reference": "Philippians 4:13", "text": "I can do all things through Christ who strengthens me."},
  {"day": 256, "date": "Sep 13", "reference": "Joshua 1:9", "text": "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."},
  {"day": 257, "date": "Sep 14", "reference": "Psalm 46:10", "text": "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth."},
  {"day": 258, "date": "Sep 15", "reference": "John 3:16", "text": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."},
  {"day": 259, "date": "Sep 16", "reference": "Psalm 119:105", "text": "Your word is a lamp for my feet, a light on my path."},
  {"day": 260, "date": "Sep 17", "reference": "Romans 12:2", "text": "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."},
  {"day": 261, "date": "Sep 18", "reference": "1 Corinthians 13:13", "text": "And now these three remain: faith, hope and love. But the greatest of these is love."},
  {"day": 262, "date": "Sep 19", "reference": "Galatians 5:22-23", "text": "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control."},
  {"day": 263, "date": "Sep 20", "reference": "Ephesians 2:8-9", "text": "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God."},
  {"day": 264, "date": "Sep 21", "reference": "Hebrews 11:1", "text": "Now faith is confidence in what we hope for and assurance about what we do not see."},
  {"day": 265, "date": "Sep 22", "reference": "1 Peter 5:7", "text": "Cast all your anxiety on him because he cares for you."},
  {"day": 266, "date": "Sep 23", "reference": "Psalm 27:1", "text": "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?"},
  {"day": 267, "date": "Sep 24", "reference": "Isaiah 41:10", "text": "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you."},
  {"day": 268, "date": "Sep 25", "reference": "Matthew 11:28", "text": "Come to me, all you who are weary and burdened, and I will give you rest."},
  {"day": 269, "date": "Sep 26", "reference": "John 14:6", "text": "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'"},
  {"day": 270, "date": "Sep 27", "reference": "Romans 8:31", "text": "If God is for us, who can be against us?"},
  {"day": 271, "date": "Sep 28", "reference": "Philippians 4:6-7", "text": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."},
  {"day": 272, "date": "Sep 29", "reference": "Colossians 3:23", "text": "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters."},
  {"day": 273, "date": "Sep 30", "reference": "Psalm 91:1-2", "text": "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty."},
  {"day": 365, "date": "Dec 31", "reference": "Numbers 6:24-26", "text": "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace."}
];

const eventsData = [
  {
    "id": "evt-1",
    "title": "Sunday Worship Service",
    "day": "Every Sunday",
    "time": "08:00 AM & 10:30 AM",
    "location": "Calvary Church 2nd Floor, Above HBR VAN Biryani, HBR Layout, Bangalore",
    "category": "Weekly Service",
    "description": "Experience divine worship, anointing word by Prophet Michael Manju, and miraculous healing prayers. All are welcome!",
    "badge": "Primary Service",
    "details": "• 08:00 AM — Tamil Service\n• 10:30 AM — Kannada Service"
  },
  {
    "id": "evt-2",
    "title": "Mid-Week Miracle & Prayer Service",
    "day": "Every Wednesday",
    "time": "06:30 PM onwards",
    "location": "Calvary Church 2nd Floor, Above HBR VAN Biryani, HBR Layout, Bangalore",
    "category": "Prayer & Bible Study",
    "description": "Deep biblical teaching, intercessory prayer for families, sick, and deliverance ministration.",
    "badge": "Mid-Week"
  },
  {
    "id": "evt-3",
    "title": "Fasting and Deliverance Prayer Meeting",
    "day": "Every Month Second Saturday",
    "time": "10:30 AM onwards",
    "location": "Calvary Church 2nd Floor, Above HBR VAN Biryani, HBR Layout, Bangalore",
    "category": "Monthly Special Meeting",
    "description": "Special monthly fasting, prophetic revelation, and deliverance prayer meeting with Prophet Michael Manju.",
    "badge": "Special Event",
    "note": "🍲 Note: Lunch will be provided."
  }
];

const testimoniesData = [
  {
    "id": "tst-1",
    "name": "Sister Mary D.",
    "city": "Chennai, Tamil Nadu",
    "category": "Miraculous Healing",
    "date": "August 2026",
    "title": "Healed of Stage 3 Tumor",
    "story": "I was diagnosed with a severe medical condition in early 2026. During the Friday Anointing Night service, Prophet Michael Manju prayed over me and declared total healing in Jesus' name. A week later, medical scans confirmed the tumor was completely gone! Praise the Almighty God!"
  },
  {
    "id": "tst-2",
    "name": "Brother David & Family",
    "city": "Bengaluru, Karnataka",
    "category": "Financial Breakthrough",
    "date": "July 2026",
    "title": "Debt Released and Business Restored",
    "story": "Our family business faced severe financial losses. We submitted a prayer request through the Calvary Church website. Prophet Michael Manju and the prayer team stood with us in agreement. Within two weeks, unexpected contracts opened up, clearing all our debts!"
  },
  {
    "id": "tst-3",
    "name": "Grace K.",
    "city": "Coimbatore",
    "category": "Family Restoration",
    "date": "June 2026",
    "title": "My Son Returned to God & Family",
    "story": "My son had departed from faith and family for over four years. I attended Sunday Service and wept at the alter. Prophet Michael Manju gave a prophetic word that God was touching my son's heart. That exact evening, my son called me in tears asking for forgiveness!"
  },
  {
    "id": "tst-4",
    "name": "Pastor Samuel V.",
    "city": "Hyderabad",
    "category": "Spiritual Growth",
    "date": "May 2026",
    "title": "Anointed Ministry & Deliverance",
    "story": "Attending Jesus Mission Ministries leadership convention transformed my spiritual life. The prophetic insight and humble fatherly heart of Prophet Michael Manju opened new doors for our local outreach."
  }
];

// -----------------------------------------------------------------------------
// 2. FEATURE MODULES
// -----------------------------------------------------------------------------

// Daily Verse Marquee Ticker Handler
function initDailyVerseTicker() {
  const tickerText = document.getElementById('tickerText');
  const tickerRef = document.getElementById('tickerRef');
  const tickerTrack = document.getElementById('tickerTrack');

  if (!dailyVerses || !dailyVerses.length) return;

  // Get current local date formatting (e.g., "Sep 10")
  const now = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthStr = months[now.getMonth()];
  const currentDayNum = now.getDate();
  const formattedToday = `${currentMonthStr} ${String(currentDayNum).padStart(2, '0')}`;

  // Calculate day of year (1 - 366)
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // Match by today's date string (e.g. "Sep 10") or day of year
  let todayVerse = dailyVerses.find(v => v.date === formattedToday) ||
                   dailyVerses.find(v => v.day === dayOfYear) ||
                   dailyVerses[(dayOfYear - 1) % dailyVerses.length] ||
                   dailyVerses[0];

  if (todayVerse) {
    const displayRef = `— ${todayVerse.reference} (${formattedToday})`;

    if (tickerText) tickerText.textContent = `"${todayVerse.text}"`;
    if (tickerRef) tickerRef.textContent = displayRef;

    // Double content inside marquee track for continuous loop effect
    if (tickerTrack) {
      const existingDuplicate = tickerTrack.querySelector('.ticker-duplicate');
      if (!existingDuplicate) {
        const duplicateSpan = document.createElement('span');
        duplicateSpan.className = 'ticker-duplicate';
        duplicateSpan.style.marginLeft = '4rem';
        duplicateSpan.innerHTML = `<span class="verse-text-span">"${todayVerse.text}"</span> <span class="verse-ref-span">${displayRef}</span>`;
        tickerTrack.appendChild(duplicateSpan);
      } else {
        const dupRef = existingDuplicate.querySelector('.verse-ref-span');
        if (dupRef) dupRef.textContent = displayRef;
      }
    }
  }
}

// Navigation & View Router Logic
function initNavigation() {
  const triggers = document.querySelectorAll('.nav-trigger');
  const views = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksContainer = document.getElementById('navLinks');

  function switchView(targetViewId) {
    if (!targetViewId) return;

    // Hide all views
    views.forEach(v => v.classList.remove('active-view'));

    // Show target view
    const targetView = document.getElementById(targetViewId);
    if (targetView) {
      targetView.classList.add('active-view');
    } else {
      document.getElementById('home-view')?.classList.add('active-view');
    }

    // Update active navbar link
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    if (navLinksContainer) navLinksContainer.classList.remove('open');

    // Scroll to top of window smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Handle click on any nav trigger button or link
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const viewId = trigger.getAttribute('data-view');
      if (viewId) {
        e.preventDefault();
        switchView(viewId);
        if (history.pushState) {
          history.pushState(null, null, trigger.getAttribute('href') || '#home');
        } else {
          window.location.hash = trigger.getAttribute('href') || '#home';
        }
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Check URL hash on load or URL hash changes (back/forward navigation)
  function handleHashChange() {
    const hash = window.location.hash;
    if (hash) {
      const viewIdFromHash = hash.replace('#', '') + '-view';
      const exists = document.getElementById(viewIdFromHash);
      if (exists) {
        switchView(viewIdFromHash);
        return;
      }
    }
    switchView('home-view');
  }

  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('popstate', handleHashChange);
  handleHashChange();
}

// Clipboard Copy & Toast Helper
function initCopyHelper() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy. Please select manually.');
        });
      }
    });
  });
}

// Render Events and Service Timings
function initEvents() {
  const homeGrid = document.getElementById('homeTimingsGrid');
  const fullGrid = document.getElementById('eventsFullList');

  if (!eventsData || !eventsData.length) return;

  function renderTimingCard(evt) {
    const detailsHtml = evt.details ? `
      <div class="timing-details">
        ${evt.details.replace(/\n/g, '<br>')}
      </div>
    ` : '';

    const noteHtml = evt.note ? `
      <div class="timing-note">
        ${evt.note}
      </div>
    ` : '';

    return `
      <div class="timing-card">
        <div class="timing-card-body">
          <span class="timing-day-badge">${evt.badge || evt.category}</span>
          <h3 class="timing-title">${evt.title}</h3>
          <div class="timing-time">
            <span>⏰</span> <span>${evt.day} — ${evt.time}</span>
          </div>
          ${detailsHtml}
          <p class="timing-desc">${evt.description}</p>
          ${noteHtml}
        </div>
        <div class="timing-card-footer">
          <span style="flex-shrink:0;">📍</span>
          <span>${evt.location}</span>
        </div>
      </div>
    `;
  }

  if (homeGrid) homeGrid.innerHTML = eventsData.map(renderTimingCard).join('');
  if (fullGrid) fullGrid.innerHTML = eventsData.map(renderTimingCard).join('');
}

// Testimonies Rendering & Submission Handler
function initTestimonies() {
  const homePreview = document.getElementById('homeTestimoniesPreview');
  const fullGrid = document.getElementById('fullTestimoniesGrid');
  const modal = document.getElementById('testimonyModal');
  const openBtn = document.getElementById('openTestimonyModalBtn');
  const closeBtn = document.getElementById('closeTestimonyModal');
  const form = document.getElementById('testimonyForm');

  const storedUserTestimonies = JSON.parse(localStorage.getItem('cc_user_testimonies') || '[]');
  const allTestimonies = [...storedUserTestimonies, ...testimoniesData];

  function renderCard(t) {
    return `
      <div class="testimony-card">
        <div>
          <span class="testimony-badge">${t.category || 'Praise Record'}</span>
          <h4 class="testimony-title">${t.title}</h4>
          <p class="testimony-story">"${t.story}"</p>
        </div>
        <div class="testimony-author">
          <div class="author-avatar">${t.name ? t.name.charAt(0) : 'P'}</div>
          <div>
            <div class="author-name">${t.name}</div>
            <div class="author-location">${t.city} • ${t.date || 'Recent'}</div>
          </div>
        </div>
      </div>
    `;
  }

  // Read EXCLUSIVELY from Google Sheets (Excel file)
  fetchApprovedTestimoniesFromSheet().then(sheetTestimonies => {
    if (sheetTestimonies && sheetTestimonies.length > 0) {
      if (homePreview) homePreview.innerHTML = sheetTestimonies.slice(0, 3).map(renderCard).join('');
      if (fullGrid) fullGrid.innerHTML = sheetTestimonies.map(renderCard).join('');
    } else {
      const emptyStateHtml = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
          <div style="font-size: 2.5rem; color: var(--gold-primary); margin-bottom: 0.8rem;">✨</div>
          <h3 style="font-family: var(--font-heading); color: var(--slate-dark); font-size: 1.3rem;">No Approved Testimonies Yet</h3>
          <p style="color: var(--slate-medium); margin: 0.5rem 0 1.2rem; font-size: 0.95rem;">Testimonies set to 'Yes' under Display Testimony in your Google Sheet will appear here live!</p>
          <button class="btn-primary" onclick="document.getElementById('testimonyModal').classList.add('active')" style="margin: 0 auto;">
            <span>Share Your Testimony</span>
          </button>
        </div>
      `;
      if (homePreview) homePreview.innerHTML = emptyStateHtml;
      if (fullGrid) fullGrid.innerHTML = emptyStateHtml;
    }
  });

  const testimonySuccessModal = document.getElementById('testimonySuccessModal');
  const closeTestimonySuccessModal = document.getElementById('closeTestimonySuccessModal');
  const btnDoneTestimonyModal = document.getElementById('btnDoneTestimonyModal');

  const nameInput = document.getElementById('testifierName');
  const cityInput = document.getElementById('testifierCity');
  const headlineInput = document.getElementById('testimonyHeadline');
  const detailInput = document.getElementById('testimonyDetail');

  const nameError = document.getElementById('testifierNameError');
  const cityError = document.getElementById('testifierCityError');
  const headlineError = document.getElementById('testimonyTitleError');
  const detailError = document.getElementById('testimonyDetailError');

  function clearError(input, errorEl) {
    if (input) input.classList.remove('input-error');
    if (errorEl) { errorEl.textContent = ''; errorEl.style.display = 'none'; }
  }

  function showError(input, errorEl, msg) {
    if (input) input.classList.add('input-error');
    if (errorEl) { errorEl.textContent = '⚠️ ' + msg; errorEl.style.display = 'block'; }
  }

  openBtn?.addEventListener('click', () => modal?.classList.add('active'));
  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput?.value.trim();
    const city = cityInput?.value.trim();
    const title = headlineInput?.value.trim();
    const story = detailInput?.value.trim();

    let isValid = true;
    if (!name) { showError(nameInput, nameError, 'Name is required.'); isValid = false; } else clearError(nameInput, nameError);
    if (!city) { showError(cityInput, cityError, 'City / Location is required.'); isValid = false; } else clearError(cityInput, cityError);
    if (!title) { showError(headlineInput, headlineError, 'Testimony title is required.'); isValid = false; } else clearError(headlineInput, headlineError);
    if (!story) { showError(detailInput, detailError, 'Testimony story details required.'); isValid = false; } else clearError(detailInput, detailError);

    if (!isValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Submitting Testimony...</span>';
      submitBtn.style.opacity = '0.75';
      submitBtn.style.cursor = 'wait';
    }

    // Dispatch payload to Google Sheets for Admin Moderation (defaults to Display Testimony = "No")
    await sendToGoogleSheet({
      formType: 'Testimony',
      timestamp: new Date().toLocaleString(),
      name,
      city,
      title,
      details: story
    });

    form.reset();
    modal?.classList.remove('active');

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }

    // Open success modal informing user that testimony is submitted for review
    if (testimonySuccessModal) {
      testimonySuccessModal.classList.add('active');
    }
  });

  function closeSuccessModal() {
    if (testimonySuccessModal) testimonySuccessModal.classList.remove('active');
  }

  closeTestimonySuccessModal?.addEventListener('click', closeSuccessModal);
  btnDoneTestimonyModal?.addEventListener('click', () => {
    closeSuccessModal();
    const testimoniesTrigger = document.querySelector('[data-view="testimonies-view"]');
    if (testimoniesTrigger) testimoniesTrigger.click();
  });
}

// Prayer Request Form Validation & Processing
function initPrayerForm() {
  const prayerForm = document.getElementById('prayerForm');
  const prayerSuccessModal = document.getElementById('prayerSuccessModal');
  const closePrayerSuccessModal = document.getElementById('closePrayerSuccessModal');
  const btnDonePrayerModal = document.getElementById('btnDonePrayerModal');

  if (!prayerForm) return;

  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const nameInput = document.getElementById('fullName');
  const messageInput = document.getElementById('prayerMessage');
  const categorySelect = document.getElementById('prayerCategory');

  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const nameError = document.getElementById('nameError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    if (!email) return 'Email address is required.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address (e.g., name@example.com).';
    }
    const parts = email.split('@');
    if (parts.length === 2) {
      const domainParts = parts[1].split('.');
      const tld = domainParts[domainParts.length - 1];
      if (!tld || /^\d+$/.test(tld)) {
        return 'Email must end with a valid domain (e.g., .com, .org).';
      }
    }
    return '';
  }

  function validatePhone(phone) {
    if (!phone) return 'Phone / WhatsApp number is required.';
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      return 'Please enter a valid 10-digit phone number.';
    }
    return '';
  }

  function clearError(input, errorElement) {
    if (input) input.classList.remove('input-error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  function showError(input, errorElement, msg) {
    if (input) input.classList.add('input-error');
    if (errorElement) {
      errorElement.textContent = '⚠️ ' + msg;
      errorElement.style.display = 'block';
    }
  }

  emailInput?.addEventListener('input', () => {
    const err = validateEmail(emailInput.value.trim());
    if (!err) clearError(emailInput, emailError);
  });

  phoneInput?.addEventListener('input', () => {
    let digitsOnly = phoneInput.value.replace(/\D/g, '');
    if (digitsOnly.length > 10) {
      digitsOnly = digitsOnly.slice(0, 10);
    }
    phoneInput.value = digitsOnly;
    const err = validatePhone(digitsOnly);
    if (!err) clearError(phoneInput, phoneError);
  });

  nameInput?.addEventListener('input', () => {
    if (nameInput.value.trim()) clearError(nameInput, nameError);
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.value.trim()) clearError(messageInput, messageError);
  });

  prayerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';
    const category = categorySelect?.value || '';

    let isValid = true;
    let firstInvalidInput = null;

    if (!name) {
      showError(nameInput, nameError, 'Full name is required.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      clearError(nameInput, nameError);
    }

    const emailErr = validateEmail(email);
    if (emailErr) {
      showError(emailInput, emailError, emailErr);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearError(emailInput, emailError);
    }

    const phoneErr = validatePhone(phone);
    if (phoneErr) {
      showError(phoneInput, phoneError, phoneErr);
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = phoneInput;
    } else {
      clearError(phoneInput, phoneError);
    }

    if (!message) {
      showError(messageInput, messageError, 'Please enter your prayer request details.');
      isValid = false;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    } else {
      clearError(messageInput, messageError);
    }

    if (!isValid) {
      firstInvalidInput?.focus();
      return;
    }

    const submitBtn = prayerForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Submitting Prayer Request...</span>';
      submitBtn.style.opacity = '0.75';
      submitBtn.style.cursor = 'wait';
    }

    const newSubmission = {
      id: 'pr-' + Date.now(),
      name,
      email,
      phone,
      category,
      message,
      timestamp: new Date().toISOString()
    };

    const confidential = document.getElementById('confidentialCheck')?.checked ? 'Yes' : 'No';

    const existingRequests = JSON.parse(localStorage.getItem('cc_prayer_requests') || '[]');
    existingRequests.push(newSubmission);
    localStorage.setItem('cc_prayer_requests', JSON.stringify(existingRequests));

    // Dispatch payload to Google Sheets
    await sendToGoogleSheet({
      formType: 'Prayer Request',
      timestamp: new Date().toLocaleString(),
      name,
      email,
      phone,
      category,
      details: message,
      confidential
    });

    prayerForm.reset();
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(nameInput, nameError);
    clearError(messageInput, messageError);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    }

    if (prayerSuccessModal) {
      prayerSuccessModal.classList.add('active');
    }
  });

  function closeModal() {
    if (prayerSuccessModal) {
      prayerSuccessModal.classList.remove('active');
    }
  }

  closePrayerSuccessModal?.addEventListener('click', closeModal);
  btnDonePrayerModal?.addEventListener('click', () => {
    closeModal();
    const homeTrigger = document.querySelector('[data-view="home-view"]');
    if (homeTrigger) homeTrigger.click();
  });
}

// -----------------------------------------------------------------------------
// 3. APPLICATION BOOTSTRAPPER (FAIL-SAFE)
// -----------------------------------------------------------------------------

function initApp() {
  initDailyVerseTicker();
  initNavigation();
  initCopyHelper();
  initEvents();
  initTestimonies();
  initPrayerForm();
  console.log('Calvary Church Website initialized successfully.');
}

// Ensure execution whether DOMContentLoaded has already fired or is pending
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
