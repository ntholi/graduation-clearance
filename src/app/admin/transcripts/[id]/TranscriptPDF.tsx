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
  fonts: [
    { src: '/fonts/ARIAL.TTF' },
    { src: '/fonts/ARIALBD.TTF', fontWeight: 'bold' },
  ],
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

const styles = StyleSheet.create({
  page: {
    paddingTop: '20pt',
    paddingHorizontal: '30pt',
    paddingBottom: '40pt',
    fontFamily: 'Arial',
    fontSize: '7.12pt',
  },
  header: {
    borderTop: '0.5pt solid black',
    borderBottom: '0.5pt solid black',
  },
  headerRow: {
    flexDirection: 'row',
    marginVertical: '0.5pt',
  },
  headerLeft: {
    width: '45%',
    flexDirection: 'row',
  },
  headerRight: {
    width: '55%',
    flexDirection: 'row',
  },
  headerLabel: {
    width: '90pt',
    fontWeight: 'bold',
  },
  headerColon: {
    width: '10pt',
    textAlign: 'center',
  },
  headerValue: {
    flex: 1,
  },
  contentHeader: {
    marginTop: '8pt',
    flexDirection: 'row',
    gap: '20pt',
    borderTop: '0.5pt solid black',
    borderBottom: '0.5pt solid black',
  },
  leftContentHeader: {
    flex: 1,
  },
  rightContentHeader: {
    flex: 1,
  },
  content: {
    marginTop: '10pt',
    flexDirection: 'row',
    gap: '20pt',
  },
  column: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: '3pt',
    fontWeight: 'bold',
  },
  code: {
    width: '60pt',
  },
  name: {
    flex: 1,
  },
  credit: {
    width: '40pt',
    textAlign: 'right',
  },
  grade: {
    paddingLeft: '10pt',
    width: '35pt',
  },
  termSection: {
    marginBottom: '10pt',
  },
  termTitle: {
    marginBottom: '3pt',
    fontWeight: 'bold',
  },
  gradeRow: {
    flexDirection: 'row',
    minHeight: '7pt',
  },
  termSummary: {
    marginLeft: '60pt',
    marginTop: '2pt',
  },
  summaryLine: {
    flexDirection: 'row',
    minHeight: '11pt',
  },
  gpaLabel: {
    width: '30pt',
  },
  cgpaLabel: {
    width: '35pt',
  },
  creditsLabel: {
    width: '85pt',
    marginLeft: '25pt',
  },
  gpaValue: {
    width: '35pt',
    textAlign: 'right',
  },
  creditsValue: {
    width: '45pt',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: '60pt',
    left: '30pt',
    right: '30pt',
  },
  totalRow: {
    flexDirection: 'row',
    minHeight: '12pt',
  },
  totalLabel: {
    width: '110pt',
  },
  registrar: {
    position: 'absolute',
    bottom: '100pt',
    right: '40pt',
    width: '100pt',
    textAlign: 'center',
    borderTop: '0.5pt solid black',
    paddingTop: '5pt',
  },
  validation: {
    position: 'absolute',
    bottom: '40pt',
    right: '30pt',
    width: '250pt',
    fontSize: '8pt',
    textAlign: 'center',
  },
});

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
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>Student Name</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.name}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Date of Admission</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.admissionDate}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>Student ID</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.studentId}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Date of Completion</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.completionDate}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>IC / Passport No.</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.passportNo}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Programme</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.programme}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>Gender</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.gender}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Faculty</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.faculty}</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerLabel}>Nationality</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.nationality}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerLabel}>Issued Date</Text>
              <Text style={styles.headerColon}>:</Text>
              <Text style={styles.headerValue}>{student.issuedDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentHeader}>
          <View style={styles.leftContentHeader}>
            <View style={styles.tableHeader}>
              <Text style={styles.code}>Code</Text>
              <Text style={styles.name}>Module Name</Text>
              <Text style={styles.credit}>Credit</Text>
              <Text style={styles.grade}>Grade</Text>
            </View>
          </View>
          <View style={styles.rightContentHeader}>
            <View style={styles.tableHeader}>
              <Text style={styles.code}>Code</Text>
              <Text style={styles.name}>Module Name</Text>
              <Text style={styles.credit}>Credit</Text>
              <Text style={styles.grade}>Grade</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.column}>
            {leftTerms.map((term, i) => (
              <View key={i} style={styles.termSection}>
                <Text style={styles.termTitle}>{term.term}</Text>
                {term.grades.map((grade, j) => (
                  <View key={j} style={styles.gradeRow}>
                    <Text style={styles.code}>{grade.courseCode}</Text>
                    <Text style={styles.name}>{grade.courseName}</Text>
                    <Text style={styles.credit}>{grade.credits}</Text>
                    <Text style={styles.grade}>{grade.grade}</Text>
                  </View>
                ))}
                <View style={styles.termSummary}>
                  <View style={styles.summaryLine}>
                    <Text style={styles.gpaLabel}>GPA</Text>
                    <Text style={styles.gpaValue}>
                      {':  '}
                      {term.gpa}
                    </Text>
                    <Text style={styles.creditsLabel}>Credits Earned</Text>
                    <Text style={styles.creditsValue}>
                      {':  '}
                      {term.credits}
                    </Text>
                  </View>
                  <View style={styles.summaryLine}>
                    <Text style={styles.cgpaLabel}>CGPA</Text>
                    <Text style={styles.gpaValue}>
                      {':  '}
                      {term.cgpa}
                    </Text>
                    <Text style={styles.creditsLabel}>Cumulative Credits</Text>
                    <Text style={styles.creditsValue}>
                      {':  '}
                      {term.cumulativeCredits}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.column}>
            {rightTerms.map((term, i) => (
              <View key={i} style={styles.termSection}>
                <Text style={styles.termTitle}>{term.term}</Text>
                {term.grades.map((grade, j) => (
                  <View key={j} style={styles.gradeRow}>
                    <Text style={styles.code}>{grade.courseCode}</Text>
                    <Text style={styles.name}>{grade.courseName}</Text>
                    <Text style={styles.credit}>{grade.credits}</Text>
                    <Text style={styles.grade}>{grade.grade}</Text>
                  </View>
                ))}
                <View style={styles.termSummary}>
                  <View style={styles.summaryLine}>
                    <Text style={styles.gpaLabel}>GPA</Text>
                    <Text style={styles.gpaValue}>
                      {':  '}
                      {term.gpa}
                    </Text>
                    <Text style={styles.creditsLabel}>Credits Earned</Text>
                    <Text style={styles.creditsValue}>
                      {':  '}
                      {term.credits}
                    </Text>
                  </View>
                  <View style={styles.summaryLine}>
                    <Text style={styles.cgpaLabel}>CGPA</Text>
                    <Text style={styles.gpaValue}>
                      {':  '}
                      {term.cgpa}
                    </Text>
                    <Text style={styles.creditsLabel}>Cumulative Credits</Text>
                    <Text style={styles.creditsValue}>
                      {':  '}
                      {term.cumulativeCredits}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total MPU Credits</Text>
            <Text>{':  '}-</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Credit Transferred</Text>
            <Text>{':  '}-</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Credits Earned</Text>
            <Text>
              {':  '}
              {terms[terms.length - 1].cumulativeCredits}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Cumulative Credits</Text>
            <Text>
              {':  '}
              {terms[terms.length - 1].cumulativeCredits}
            </Text>
          </View>
        </View>

        <Text style={styles.registrar}>REGISTRAR</Text>
        <Text style={styles.validation}>
          This is not a valid record unless it bears both the stamp and
          signatory on behalf of the university
        </Text>
      </Page>
    </Document>
  );
};

export default TranscriptPDF;
