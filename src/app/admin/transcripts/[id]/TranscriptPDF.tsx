import { Document, Page, Text, View, Font } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

Font.register({
  family: 'Arial',
  src: '/fonts/ARIAL.TTF',
});

Font.register({
  family: 'Arial-Bold',
  src: '/fonts/ARIALBD.TTF',
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ['Arial'],
      bold: ['Arial-Bold'],
    },
    extend: {
      colors: {
        border: '#000000',
      },
      borderWidth: {
        DEFAULT: '0.5pt',
      },
    },
  },
});

type Student = {
  name: string;
  stdNo: string;
  nationalId: string;
  gender: string;
  nationality: string;
  admissionDate: string;
  completionDate: string;
  program: string;
  faculty: string;
  issuedDate: string;
};

type Grade = {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: string;
};

type Term = {
  term: string;
  grades: Grade[];
  gpa: number;
  credits: number;
  cgpa: number;
  cumulativeCredits: number;
};

const HeaderRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw('flex flex-row')}>
    <Text style={tw('w-[90pt] font-bold')}>{label}</Text>
    <Text style={tw('w-[10pt] text-center')}>:</Text>
    <Text style={tw('flex-1')}>{value}</Text>
  </View>
);

const TableHeader = () => (
  <View style={tw('flex flex-row font-bold py-1.5')}>
    <Text style={tw('w-[60pt]')}>Code</Text>
    <Text style={tw('flex-1')}>Module Name</Text>
    <Text style={tw('w-[40pt] text-right')}>Credit</Text>
    <Text style={tw('w-[35pt] pl-2.5')}>Grade</Text>
  </View>
);

const GradeRow = ({ grade }: { grade: Grade }) => (
  <View style={tw('flex flex-row min-h-[7pt]')}>
    <Text style={tw('w-[60pt]')}>{grade.courseCode}</Text>
    <Text style={tw('flex-1')}>{grade.courseName}</Text>
    <Text style={tw('w-[40pt] text-right')}>{grade.credits}</Text>
    <Text style={tw('w-[35pt] pl-2.5')}>{grade.grade}</Text>
  </View>
);

const TermSummary = ({ term }: { term: Term }) => (
  <View style={tw('ml-[60pt] mt-0.5 mt-1')}>
    <View style={tw('flex flex-row justify-between w-[87%]')}>
      <View style={tw('w-[60pt] flex-row justify-between')}>
        <Text>GPA</Text>
        <Text>{`:  ${term.gpa}`}</Text>
      </View>
      <View style={tw('w-[100pt] flex-row justify-between')}>
        <Text>Credits Earned</Text>
        <Text style={tw('w-[20pt]')}>{`:  ${term.credits}`}</Text>
      </View>
    </View>
    <View style={tw('flex flex-row justify-between w-[87%]')}>
      <View style={tw('w-[60pt] flex-row justify-between')}>
        <Text>CGPA</Text>
        <Text>{`:  ${term.cgpa}`}</Text>
      </View>
      <View style={tw('w-[100pt] flex-row justify-between')}>
        <Text>Cumulative Credits</Text>
        <Text style={tw('w-[20pt]')}>{`:  ${term.cumulativeCredits}`}</Text>
      </View>
    </View>
  </View>
);

const TermSection = ({ term }: { term: Term }) => (
  <View style={tw('mb-2.5')}>
    <Text style={tw('mb-0.5 font-bold')}>{term.term}</Text>
    {term.grades.map((grade, j) => (
      <GradeRow key={j} grade={grade} />
    ))}
    <TermSummary term={term} />
  </View>
);

const TranscriptPDF = ({
  student,
  terms,
}: {
  student: Student;
  terms: Term[];
}) => {
  const leftTerms = terms.slice(0, 6);
  const rightTerms = terms.slice(6);

  const issueDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Document>
      <Page
        size='A4'
        style={tw('pt-5 px-8 pb-10 font-sans text-[7.12pt] pt-[166pt]')}
      >
        {/* Header Section */}
        <View style={tw('border-t border-b')}>
          <View style={tw('flex flex-row')}>
            <View style={tw('w-1/2')}>
              <HeaderRow label='Student Name' value={student.name} />
              <HeaderRow label='Student ID' value={student.stdNo} />
              <HeaderRow label='IC / Passport No.' value={student.nationalId} />
              <HeaderRow label='Gender' value={student.gender} />
              <HeaderRow label='Nationality' value={student.nationality} />
            </View>
            <View style={tw('w-1/2')}>
              <HeaderRow label='Date of Admission' value={terms[0].term} />
              <HeaderRow label='Date of Completion' value={'November 2024'} />
              <HeaderRow
                label='Programme'
                value={correctSpelling(student.program)}
              />
              <HeaderRow label='Faculty' value={findFaculty(student.program)} />
              <HeaderRow label='Issued Date' value={issueDate} />
            </View>
          </View>
        </View>

        {/* Content Header */}
        <View style={tw('mt-2 flex flex-row gap-5 border-t border-b')}>
          <View style={tw('flex-1')}>
            <TableHeader />
          </View>
          <View style={tw('flex-1')}>
            <TableHeader />
          </View>
        </View>

        {/* Content */}
        <View style={tw('mt-2.5 flex flex-row gap-5')}>
          <View style={tw('flex-1')}>
            {leftTerms.map((term, i) => (
              <TermSection key={i} term={term} />
            ))}
          </View>
          <View style={tw('flex-1')}>
            {rightTerms.map((term, i) => (
              <TermSection key={i} term={term} />
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={tw('absolute bottom-[30pt] left-[85pt]')}>
          {['Total MPU Credits', 'Total Credit Transferred'].map((label) => (
            <View key={label} style={tw('flex flex-row')}>
              <Text style={tw('w-[160pt]')}>{label}</Text>
              <Text>{':  '}-</Text>
            </View>
          ))}
          {['Total Credits Earned', 'Total Cumulative Credits'].map((label) => (
            <View key={label} style={tw('flex flex-row')}>
              <Text style={tw('w-[160pt]')}>{label}</Text>
              <Text>
                {':  '}
                {terms[terms.length - 1].cumulativeCredits}
              </Text>
            </View>
          ))}
        </View>

        {/* Registrar Signature */}
        <View style={tw('absolute bottom-[30pt] right-14 w-[190pt] border-t')}>
          <Text style={tw('pt-1.5 text-center font-bold')}>REGISTRAR</Text>
          <Text>
            This is not a valid record unless it bears both the stamp and
            signatory on behalf of the university
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TranscriptPDF;

function findFaculty(programName: string) {
  const program = programs.find((p) => p.name === programName);
  if (!program) throw new Error('Program not found');
  return program.faculty;
}

function correctSpelling(name: string) {
  return name.replace('Entreprenuership', 'Entrepreneurship');
}

const programs = [
  {
    name: 'BA in Architectural Studies',
    code: 'BAAS',
    faculty: 'Faculty of Architecture and the Built Environment',
  },
  {
    name: 'Diploma in Architecture Technology',
    code: 'DAT',
    faculty: 'Faculty of Architecture and the Built Environment',
  },
  {
    name: 'B Bus in Entreprenuership',
    code: 'BEN',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'BA in Human Resource Management',
    code: 'BHR',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'B Bus in International Business',
    code: 'BIB',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Diploma in Business Management',
    code: 'DBM',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Diploma in Marketing',
    code: 'DMK',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Diploma in Retail Management',
    code: 'DRM',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'BA in Professional Communication',
    code: 'BPC',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Diploma in Journalism & Media',
    code: 'DJM',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Diploma in Public Relations',
    code: 'DPR',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'BA in Broadcasting & Journalism',
    code: 'BBJ',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'BA in Digital Film Production',
    code: 'BDF',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Diploma in Broadcasting Radio & TV',
    code: 'DBRTV',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Diploma in Film Production',
    code: 'DFP',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'BA in Tourism Management',
    code: 'BTM',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Diploma in Events Management',
    code: 'DEM',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Diploma in Hotel Management',
    code: 'DHM',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Diploma in International Tourism',
    code: 'DITR',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Diploma in Tourism Management',
    code: 'DTM',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'B Des in Professional Design',
    code: 'BDSPD',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'Diploma in Creative Advertising',
    code: 'DCAV',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'Diploma in Graphic Design',
    code: 'DGD',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'BA in Fashion & Retailing',
    code: 'BAFASH',
    faculty: 'Faculty of Fashion and Lifestyle Design',
  },
  {
    name: 'Diploma in Fashion & Apparel Design',
    code: 'DFAD',
    faculty: 'Faculty of Fashion and Lifestyle Design',
  },
  {
    name: 'BSc in Business Information Technology',
    code: 'BSCBIT',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'BSc in Information Technology',
    code: 'BSCIT',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'BSc in Software Engineering with Multimedia',
    code: 'BSCSM',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Diploma in Business Information Technology',
    code: 'DBIT',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Diploma in Information Technology',
    code: 'DIT',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Diploma in Multimedia & Software Engineering',
    code: 'DMSE',
    faculty: 'Faculty of Information & Communication Technology',
  },
];
