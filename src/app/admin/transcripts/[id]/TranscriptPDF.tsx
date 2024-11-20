import { Document, Page, Text, View, Font } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff',
});

const tw = createTw({
  theme: {
    fontFamily: {
      arial: ['Arial'],
    },
    extend: {
      colors: {
        border: '#000000',
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
  moduleName: string;
  credit: number;
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

const TermDisplay = ({ term }: { term: Term }) => (
  <View style={tw('mb-4')}>
    <Text style={tw('font-bold mb-1')}>{term.term}</Text>
    {term.grades.map((grade, index) => (
      <View key={index} style={tw('flex flex-row mb-0.5')}>
        <Text style={tw('w-1/5')}>{grade.courseCode}</Text>
        <Text style={tw('w-1/2')}>{grade.moduleName}</Text>
        <Text style={tw('w-[15%]')}>{grade.credit}</Text>
        <Text style={tw('w-[15%]')}>{grade.grade}</Text>
      </View>
    ))}
    <View style={tw('ml-5 mt-1')}>
      <View style={tw('flex flex-row mb-0.5')}>
        <Text style={tw('w-[15%]')}>GPA</Text>
        <Text style={tw('px-0.5')}>:</Text>
        <Text style={tw('w-[23%]')}>{term.gpa}</Text>
        <Text>Credits Earned</Text>
        <Text style={tw('px-0.5')}>:</Text>
        <Text>{term.credits}</Text>
      </View>
      <View style={tw('flex flex-row mb-0.5')}>
        <Text style={tw('w-[15%]')}>CGPA</Text>
        <Text style={tw('px-0.5')}>:</Text>
        <Text style={tw('w-[23%]')}>{term.cgpa}</Text>
        <Text>Cumulative Credits</Text>
        <Text style={tw('px-0.5')}>:</Text>
        <Text>{term.cumulativeCredits}</Text>
      </View>
    </View>
  </View>
);

const TableHeaders = () => (
  <View style={tw('flex flex-row border-b border-border pb-0.5 mb-1')}>
    <Text style={tw('w-1/5')}>Code</Text>
    <Text style={tw('w-1/2')}>Module Name</Text>
    <Text style={tw('w-[15%]')}>Credit</Text>
    <Text style={tw('w-[15%]')}>Grade</Text>
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
  const leftColumnTerms = terms.slice(0, midpoint);
  const rightColumnTerms = terms.slice(midpoint);

  return (
    <Document>
      <Page size='A4' style={tw('p-10 text-[8pt] font-arial')}>
        {/* Header Information */}
        <View style={tw('mb-4')}>
          <View style={tw('flex flex-row mb-1')}>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Student Name</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.name}</Text>
            </View>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Date of Admission</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.admissionDate}</Text>
            </View>
          </View>
          <View style={tw('flex flex-row mb-1')}>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Student ID</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.studentId}</Text>
            </View>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Date of Completion</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.completionDate}</Text>
            </View>
          </View>
          <View style={tw('flex flex-row mb-1')}>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>IC / Passport No.</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.passportNo}</Text>
            </View>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Programme</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.programme}</Text>
            </View>
          </View>
          <View style={tw('flex flex-row mb-1')}>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Gender</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.gender}</Text>
            </View>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Faculty</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.faculty}</Text>
            </View>
          </View>
          <View style={tw('flex flex-row mb-1')}>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Nationality</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.nationality}</Text>
            </View>
            <View style={tw('flex flex-row w-1/2')}>
              <Text style={tw('w-[35%]')}>Issued Date</Text>
              <Text style={tw('px-0.5')}>:</Text>
              <Text>{student.issuedDate}</Text>
            </View>
          </View>
        </View>

        {/* Two-column layout */}
        <View style={tw('flex flex-row mt-2.5')}>
          <View style={tw('w-1/2 pr-2.5')}>
            <TableHeaders />
            {leftColumnTerms.map((term, index) => (
              <TermDisplay key={index} term={term} />
            ))}
          </View>
          <View style={tw('w-1/2 pl-2.5')}>
            <TableHeaders />
            {rightColumnTerms.map((term, index) => (
              <TermDisplay key={index} term={term} />
            ))}
          </View>
        </View>

        {/* Totals Section */}
        <View style={tw('mt-5 border-t border-border pt-2.5')}>
          <View style={tw('flex flex-row mb-2')}>
            <Text style={tw('w-1/4')}>Total MPU Credits</Text>
            <Text style={tw('px-0.5')}>:</Text>
            <Text>-</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <Text style={tw('w-1/4')}>Total Credit Transferred</Text>
            <Text style={tw('px-0.5')}>:</Text>
            <Text>-</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <Text style={tw('w-1/4')}>Total Credits Earned</Text>
            <Text style={tw('px-0.5')}>:</Text>
            <Text>{terms.reduce((sum, term) => sum + term.credits, 0)}</Text>
          </View>
          <View style={tw('flex flex-row mb-2')}>
            <Text style={tw('w-1/4')}>Total Cumulative Credits</Text>
            <Text style={tw('px-0.5')}>:</Text>
            <Text>{terms[terms.length - 1].cumulativeCredits}</Text>
          </View>
        </View>

        <Text style={tw('absolute bottom-[60pt] left-10 uppercase text-[9pt]')}>
          REGISTRAR
        </Text>
        <Text
          style={tw(
            'absolute bottom-10 left-10 right-10 text-center text-[8pt]',
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
