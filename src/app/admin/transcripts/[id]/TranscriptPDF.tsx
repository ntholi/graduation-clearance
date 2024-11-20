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
    padding: 20,
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
  headerLabel: {
    width: '20%',
    fontWeight: 'bold',
  },
  headerValue: {
    width: '30%',
  },
  headerColon: {
    width: '2%',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #000',
    paddingBottom: 2,
  },
  tableRow: {
    flexDirection: 'row',
    paddingTop: 2,
    paddingBottom: 2,
  },
  codeColumn: {
    width: '15%',
  },
  nameColumn: {
    width: '45%',
  },
  creditGradeColumn: {
    width: '10%',
    textAlign: 'center',
  },
  termHeader: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  termSummary: {
    marginTop: 3,
    marginLeft: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 30,
  },
  totals: {
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    textAlign: 'center',
    fontSize: 8,
  },
});

type TranscriptPDFProps = {
  student: {
    name: string;
    stdNo: string;
    program: string;
    nationality: string;
  };
  terms: Array<{
    term: string;
    gpa: number;
    cgpa: number;
    credits: number;
    grades: Array<{
      courseCode: string;
      courseName: string;
      credits: number;
      grade: string;
    }>;
  }>;
};

export default function TranscriptPDF({ student, terms }: TranscriptPDFProps) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Text style={styles.headerLabel}>Student Name</Text>
            <Text style={styles.headerColon}>:</Text>
            <Text style={styles.headerValue}>{student.name}</Text>
            <Text style={styles.headerLabel}>Date of Admission</Text>
            <Text style={styles.headerColon}>:</Text>
            <Text style={styles.headerValue}>August 2021</Text>
          </View>
        </View>

        {terms.map((term, index) => (
          <View key={index}>
            <Text style={styles.termHeader}>{term.term}</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.codeColumn}>Code</Text>
                <Text style={styles.nameColumn}>Module Name</Text>
                <Text style={styles.creditGradeColumn}>Credit</Text>
                <Text style={styles.creditGradeColumn}>Grade</Text>
              </View>

              {term.grades.map((grade, gradeIndex) => (
                <View key={gradeIndex} style={styles.tableRow}>
                  <Text style={styles.codeColumn}>{grade.courseCode}</Text>
                  <Text style={styles.nameColumn}>{grade.courseName}</Text>
                  <Text style={styles.creditGradeColumn}>{grade.credits}</Text>
                  <Text style={styles.creditGradeColumn}>{grade.grade}</Text>
                </View>
              ))}

              <View style={styles.termSummary}>
                <View style={styles.summaryRow}>
                  <Text>GPA : {term.gpa}</Text>
                  <Text>Credits Earned : {term.credits}</Text>
                </View>
                <Text>CGPA : {term.cgpa}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.totals}>
          <Text>Total MPU Credits : -</Text>
          <Text>Total Credits Transferred : -</Text>
          <Text>
            Total Credits Earned :{' '}
            {terms.reduce((sum, term) => sum + term.credits, 0)}
          </Text>
          <Text>
            Total Cumulative Credits :{' '}
            {terms.reduce((sum, term) => sum + term.credits, 0)}
          </Text>
        </View>

        <Text style={styles.footer}>
          This is not a valid record unless it bears both the stamp and
          signature on behalf of the university
        </Text>
      </Page>
    </Document>
  );
}
