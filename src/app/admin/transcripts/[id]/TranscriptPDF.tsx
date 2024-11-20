import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxM.woff',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 8,
    fontFamily: 'Arial',
  },
  header: {
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  headerField: {
    flexDirection: 'row',
    width: '50%',
  },
  headerLabel: {
    width: '35%',
  },
  headerColon: {
    width: '2%',
    paddingHorizontal: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  column: {
    width: '50%',
    paddingRight: 10,
  },
  columnRight: {
    width: '50%',
    paddingLeft: 10,
  },
  tableHeaders: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    paddingBottom: 2,
    marginBottom: 5,
  },
  codeHeader: {
    width: '20%',
  },
  moduleHeader: {
    width: '50%',
  },
  creditHeader: {
    width: '15%',
  },
  gradeHeader: {
    width: '15%',
  },
  termSection: {
    marginBottom: 15,
  },
  termTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradeRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  code: {
    width: '20%',
  },
  module: {
    width: '50%',
  },
  credit: {
    width: '15%',
  },
  grade: {
    width: '15%',
  },
  termSummary: {
    marginLeft: 20,
    marginTop: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  summaryLabel: {
    width: '15%',
  },
  summaryColon: {
    width: '2%',
  },
  summaryValue: {
    width: '23%',
  },
  summaryCredit: {
    width: '30%',
  },
  totalsSection: {
    marginTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#000000',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  totalLabel: {
    width: '25%',
  },
  registrar: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    textTransform: 'uppercase',
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
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
  <View style={styles.termSection}>
    <Text style={styles.termTitle}>{term.term}</Text>
    {term.grades.map((grade, index) => (
      <View key={index} style={styles.gradeRow}>
        <Text style={styles.code}>{grade.courseCode}</Text>
        <Text style={styles.module}>{grade.moduleName}</Text>
        <Text style={styles.credit}>{grade.credit}</Text>
        <Text style={styles.grade}>{grade.grade}</Text>
      </View>
    ))}
    <View style={styles.termSummary}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>GPA</Text>
        <Text style={styles.summaryColon}>:</Text>
        <Text style={styles.summaryValue}>{term.gpa}</Text>
        <Text>Credits Earned</Text>
        <Text style={styles.summaryColon}>:</Text>
        <Text>{term.credits}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>CGPA</Text>
        <Text style={styles.summaryColon}>:</Text>
        <Text style={styles.summaryValue}>{term.cgpa}</Text>
        <Text>Cumulative Credits</Text>
        <Text style={styles.summaryColon}>:</Text>
        <Text>{term.cumulativeCredits}</Text>
      </View>
    </View>
  </View>
);

const TableHeaders = () => (
  <View style={styles.tableHeaders}>
    <Text style={styles.codeHeader}>Code</Text>
    <Text style={styles.moduleHeader}>Module Name</Text>
    <Text style={styles.creditHeader}>Credit</Text>
    <Text style={styles.gradeHeader}>Grade</Text>
  </View>
);

const TranscriptPDF = ({
  student,
  terms,
}: {
  student: Student;
  terms: Term[];
}) => {
  // Split terms into left and right columns
  const midpoint = Math.ceil(terms.length / 2);
  const leftColumnTerms = terms.slice(0, midpoint);
  const rightColumnTerms = terms.slice(midpoint);

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header Information */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Student Name</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.name}</Text>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Date of Admission</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.admissionDate}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Student ID</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.studentId}</Text>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Date of Completion</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.completionDate}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>IC / Passport No.</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.passportNo}</Text>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Programme</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.programme}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Gender</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.gender}</Text>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Faculty</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.faculty}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Nationality</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.nationality}</Text>
            </View>
            <View style={styles.headerField}>
              <Text style={styles.headerLabel}>Issued Date</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text>{student.issuedDate}</Text>
            </View>
          </View>
        </View>

        {/* Two-column layout for terms */}
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.column}>
            <TableHeaders />
            {leftColumnTerms.map((term, index) => (
              <TermDisplay key={index} term={term} />
            ))}
          </View>

          {/* Right Column */}
          <View style={styles.columnRight}>
            <TableHeaders />
            {rightColumnTerms.map((term, index) => (
              <TermDisplay key={index} term={term} />
            ))}
          </View>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total MPU Credits</Text>
            <Text style={styles.summaryColon}>:</Text>
            <Text>-</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Credit Transferred</Text>
            <Text style={styles.summaryColon}>:</Text>
            <Text>-</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Credits Earned</Text>
            <Text style={styles.summaryColon}>:</Text>
            <Text>{terms.reduce((sum, term) => sum + term.credits, 0)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Cumulative Credits</Text>
            <Text style={styles.summaryColon}>:</Text>
            <Text>{terms[terms.length - 1].cumulativeCredits}</Text>
          </View>
        </View>

        <Text style={styles.registrar}>REGISTRAR</Text>
        <Text style={styles.footer}>
          This is not a valid record unless it bears both the stamp and
          signatory on behalf of the university
        </Text>
      </Page>
    </Document>
  );
};

export default TranscriptPDF;
