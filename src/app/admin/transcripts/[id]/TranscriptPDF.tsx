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
    <View style={tw('flex flex-row justify-between w-[84%]')}>
      <View style={tw('w-[60pt] flex-row justify-between')}>
        <Text>GPA</Text>
        <Text>{`:  ${term.gpa}`}</Text>
      </View>
      <View style={tw('w-[100pt] flex-row justify-between')}>
        <Text>Credits Earned</Text>
        <View style={tw('flex-row justify-between w-[16pt]')}>
          <Text>:</Text>
          <Text>{term.credits}</Text>
        </View>
      </View>
    </View>
    <View style={tw('flex flex-row justify-between w-[84%]')}>
      <View style={tw('w-[60pt] flex-row justify-between')}>
        <Text>CGPA</Text>
        <Text>{`:  ${term.cgpa}`}</Text>
      </View>
      <View style={tw('w-[100pt] flex-row justify-between')}>
        <Text>Cumulative Credits</Text>
        <View style={tw('flex-row justify-between w-[16pt]')}>
          <Text>:</Text>
          <Text>{term.cumulativeCredits}</Text>
        </View>
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
  completionDate = 'November 2024',
}: {
  student: Student;
  terms: Term[];
  completionDate?: string;
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
        style={tw('pt-5 px-4 pb-10 font-sans text-[7.12pt] pt-[155pt]')}
      >
        {/* Header Section */}
        <View style={tw('border-t border-b')}>
          <View style={tw('flex flex-row')}>
            <View style={tw('w-1/2')}>
              <HeaderRow label='Student Name' value={student.name} />
              <HeaderRow label='Student ID' value={student.stdNo} />
              <HeaderRow label='IC / Passport No.' value={student.nationalId} />
              <HeaderRow label='Gender' value={student.gender} />
              <HeaderRow
                label='Nationality'
                value={student.nationality ?? 'Mosotho'}
              />
            </View>
            <View style={tw('w-1/2')}>
              <HeaderRow label='Date of Admission' value={terms[0].term} />
              <HeaderRow label='Date of Completion' value={completionDate} />
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
        <View style={tw('absolute bottom-[50pt] left-[85pt]')}>
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
        <View style={tw('absolute bottom-[50pt] right-14 w-[190pt] border-t')}>
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
  const program = programs.find((p) =>
    programName.toLowerCase().includes(p.name.toLowerCase()),
  );
  if (!program) throw new Error(`Faculty for ${programName} not found`);
  return program.faculty;
}

function correctSpelling(name: string) {
  return name.replace('Entreprenuership', 'Entrepreneurship');
}
const programs = [
  {
    name: 'Architectur',
    faculty: 'Faculty of Architecture and the Built Environment',
  },
  {
    name: 'Entreprenuership',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Entrepreneurship',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Human Resource Management',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'International Business',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Business Management',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Marketing',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Retail Management',
    faculty: 'Faculty of Business and Globalisation',
  },
  {
    name: 'Performing Arts',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Broadcasting',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Professional Communication',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Journalism & Media',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Public Relations',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Broadcasting & Journalism',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Digital Film Production',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Broadcasting Radio & TV',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Film Production',
    faculty: 'Faculty of Communication, Media and Broadcasting',
  },
  {
    name: 'Tourism',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Events Management',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Hotel Management',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'International Tourism',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Tourism Management',
    faculty: 'Faculty of Creativity in Tourism & Hospitality',
  },
  {
    name: 'Professional Design',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'Creative Advertising',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'Graphic Design',
    faculty: 'Faculty of Design and Innovation',
  },
  {
    name: 'Fashion & Retailing',
    faculty: 'Faculty of Fashion and Lifestyle Design',
  },
  {
    name: 'Fashion & Apparel Design',
    faculty: 'Faculty of Fashion and Lifestyle Design',
  },
  {
    name: 'Business Information Technology',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Information Technology',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Software Engineering with Multimedia',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Business Information Technology',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Information Technology',
    faculty: 'Faculty of Information & Communication Technology',
  },
  {
    name: 'Multimedia & Software Engineering',
    faculty: 'Faculty of Information & Communication Technology',
  },
];
