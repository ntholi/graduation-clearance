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
  studentId: string;
  passportNo: string;
  gender: string;
  nationality: string;
  admissionDate: string;
  completionDate: string;
  programme: string;
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
  <View style={tw('ml-[60pt] mt-0.5')}>
    <View style={tw('flex flex-row min-h-[11pt] justify-between w-[87%]')}>
      <View style={tw('w-[60pt] flex-row justify-between')}>
        <Text>GPA</Text>
        <Text>{`:  ${term.gpa}`}</Text>
      </View>
      <View style={tw('w-[100pt] flex-row justify-between')}>
        <Text>Credits Earned</Text>
        <Text style={tw('w-[20pt]')}>{`:  ${term.credits}`}</Text>
      </View>
    </View>
    <View style={tw('flex flex-row min-h-[11pt] justify-between w-[87%]')}>
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
  const midpoint = Math.ceil(terms.length / 2);
  const leftTerms = terms.slice(0, midpoint);
  const rightTerms = terms.slice(midpoint);

  return (
    <Document>
      <Page size='A4' style={tw('pt-5 px-8 pb-10 font-sans text-[7.12pt]')}>
        {/* Header Section */}
        <View style={tw('border-t border-b')}>
          <View style={tw('flex flex-row')}>
            <View style={tw('w-1/2')}>
              <HeaderRow label='Student Name' value={student.name} />
              <HeaderRow label='Student ID' value={student.studentId} />
              <HeaderRow label='IC / Passport No.' value={student.passportNo} />
              <HeaderRow label='Gender' value={student.gender} />
              <HeaderRow label='Nationality' value={student.nationality} />
            </View>
            <View style={tw('w-1/2')}>
              <HeaderRow
                label='Date of Admission'
                value={student.admissionDate}
              />
              <HeaderRow
                label='Date of Completion'
                value={student.completionDate}
              />
              <HeaderRow label='Programme' value={student.programme} />
              <HeaderRow label='Faculty' value={student.faculty} />
              <HeaderRow label='Issued Date' value={student.issuedDate} />
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
        <View style={tw('absolute bottom-[60pt] left-8 right-8')}>
          {['Total MPU Credits', 'Total Credit Transferred'].map((label) => (
            <View key={label} style={tw('flex flex-row min-h-[12pt]')}>
              <Text style={tw('w-[110pt]')}>{label}</Text>
              <Text>{':  '}-</Text>
            </View>
          ))}
          {['Total Credits Earned', 'Total Cumulative Credits'].map((label) => (
            <View key={label} style={tw('flex flex-row min-h-[12pt]')}>
              <Text style={tw('w-[110pt]')}>{label}</Text>
              <Text>
                {':  '}
                {terms[terms.length - 1].cumulativeCredits}
              </Text>
            </View>
          ))}
        </View>

        {/* Registrar Signature */}
        <View
          style={tw(
            'absolute bottom-[100pt] right-10 w-[100pt] border-t text-center',
          )}
        >
          <Text style={tw('pt-1.5')}>REGISTRAR</Text>
        </View>

        {/* Validation Text */}
        <Text
          style={tw(
            'absolute bottom-10 right-8 w-[250pt] text-[8pt] text-center',
          )}
        >
          This is not a valid record unless it bears both the stamp and
          signatory on behalf of the university
        </Text>
      </Page>
    </Document>
  );
};

export default TranscriptPDF;
