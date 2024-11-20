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
    fontSize: 10,
    fontFamily: 'Arial',
  },
  header: {
    marginBottom: 20,
  },
  studentInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottom: '1pt solid #000',
    paddingBottom: 10,
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    color: '#666',
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
  },
  termSection: {
    marginTop: 15,
    marginBottom: 15,
  },
  termHeader: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1pt solid #000',
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#f5f5f5',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5pt solid #ddd',
    paddingTop: 4,
    paddingBottom: 4,
  },
  codeColumn: {
    width: '15%',
  },
  nameColumn: {
    width: '55%',
  },
  creditColumn: {
    width: '15%',
  },
  gradeColumn: {
    width: '15%',
  },
  termSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingTop: 5,
    borderTop: '1pt solid #000',
  },
  summaryGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
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
          <View style={styles.studentInfo}>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Student Name</Text>
              <Text style={styles.value}>{student.name}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Student ID</Text>
              <Text style={styles.value}>{student.stdNo}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Programme</Text>
              <Text style={styles.value}>{student.program}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.label}>Nationality</Text>
              <Text style={styles.value}>{student.nationality}</Text>
            </View>
          </View>
        </View>

        {terms.map((term, index) => (
          <View key={index} style={styles.termSection}>
            <Text style={styles.termHeader}>{term.term}</Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.codeColumn}>Code</Text>
                <Text style={styles.nameColumn}>Module Name</Text>
                <Text style={styles.creditColumn}>Credit</Text>
                <Text style={styles.gradeColumn}>Grade</Text>
              </View>

              {term.grades.map((grade, gradeIndex) => (
                <View key={gradeIndex} style={styles.tableRow}>
                  <Text style={styles.codeColumn}>{grade.courseCode}</Text>
                  <Text style={styles.nameColumn}>{grade.courseName}</Text>
                  <Text style={styles.creditColumn}>{grade.credits}</Text>
                  <Text style={styles.gradeColumn}>{grade.grade}</Text>
                </View>
              ))}

              <View style={styles.termSummary}>
                <View style={styles.summaryGroup}>
                  <Text>GPA: {term.gpa}</Text>
                  <Text>CGPA: {term.cgpa}</Text>
                </View>
                <Text>Credits Earned: {term.credits}</Text>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.footer}>
          This is not a valid record unless it bears both the stamp and
          signature on behalf of the university
        </Text>
      </Page>
    </Document>
  );
}
