import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { Citation } from "../../models/CitationModels";

const citationList: Citation[] = [
  {
    id: 1,
    title:
      "Willer, A. (2003).\n Reduction of the individual cancer risk by physical exercise. Oncology Research and Treatment, 26(3), 283-289.",
    segment:
      "“Overweight, obesity, and physical inactivity contribute to the risk of developing a number of cancers. Though overweight and obesity may appear to be separate from physical activity, both constructs relate to energy balance (63). Maintaining an optimal level of energy balance—caloric expenditure relative to caloric intake—is associated with primary prevention of cancer, survival after diagnosis and recurrence of primary cancer (97, 134). Therefore, it is necessary to acknowledge the synergistic relationship between overweight or obesity and physical inactivity along the spectrum of cancer prevention and survivorship (68, 121).”",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4122430/",
  },
  {
    id: 2,
    title:
      "Green, A. C., Williams, G. M., Logan, V., & Strutton, G. M. (2011). Reduced melanoma after regular sunscreen use: randomized trial follow-up. J Clin Oncol, 29(3), 257-263.",
    segment:
      "Given the importance of early-life sun exposure in the genesis of melanoma,32 a long-term sunscreen intervention among children and adolescents may yield even greater benefits in cancer prevention33 than did this intervention in adults. The adult participants in Nambour would have experienced relatively high ambient sun exposure for years, so skin carcinogenesis may already have been initiated in many of them; only the promoting effects of ongoing adult sun exposure would have been targeted by this intervention.",
    url: "https://impactmelanoma.org/wp-content/uploads/2022/04/jco.2010.28.7078.pdf",
  },
  {
    id: 3,
    title:
      "Cornfield, J., Haenszel, W., Hammond, E. C., Lilienfeld, A. M., Shimkin, M. B., & Wynder, E. L. (1959). Smoking and lung cancer: recent evidence and a discussion of some questions. Journal of the National Cancer institute, 22(1), 173-203.",
    segment:
      "The situation is similar to the establishment of the carcinogenic activity of tar, which was accepted before the isolation of benzo[a]pyrene by Kennaway and his coworkers. In this instance, also, benzo[a]pyrene is most probably not the only carcinogen in the complex mixture called tar, and there are strong indications that some noncarcinogenic components in tar may have cocarcinogenic effects",
    url: "https://watermark.silverchair.com/dyp289.pdf?token=AQECAHi208BE49Ooan9kkhW_Ercy7Dm3ZL_9Cf3qfKAc485ysgAAA0wwggNIBgkqhkiG9w0BBwagggM5MIIDNQIBADCCAy4GCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMTLwD452H1zMDv1eqAgEQgIIC_wg86iK6gkhHCISTwu0WXwhAidNil5LmW87ndH3_yupnD_-Q4LbtrQMCpl5_a2K2gv-5P57uW6zYEBA1YMkFeZshHKgf9zzzST7Hft7Z0qItHm8R1gbKgXo_hcq1C2Y1Qkt6u5kNqZhZokCu24fs21QDamk5CN8WXeXT37ZYCfgKk_PTb1ZTkFkuo8thkt3Tw5TCvbLlEvnG8xKZhIp5e9437KWdjar4ZiqeIEyLJ6rNo4aWDDkOQXgaoYe63J6lU2qgEr9unEaAegqT2Z-fdQTugbveJSYgk-SdKhsnKlm19bl8UvNlCErsnBroZi7IKbL1bOQhm1MyBJd-lnHUAA7HxCoJggz3MgLaxJBg5YafpL4_bVLx3AWKItmnwvL0Sgm8EtW6pWXbmKPWX9NPgWta4u51ijs0SslJagr4PMUrfl5DOcF5lH3rH2HiULYqcLgInrlxH2xtyVn0ZoleYurTgrwqcmnP77SnXii9AKxI6OOzpGB0uki8aOeITBdEzy6CwsRHEVqmPFZ10s-VH4NF00LqZAKEE5i2dz8n27ATOJHCWIXOLIq-XCSQhobfDbIBEqr9CfhsI7wm5-LrjeB7xDzgkDa3PDvJ8U0BKcLhIQvGWDz_D82CF8vYU4Mg_vM3k5ghbhS8Xo3TRKbtr8XaW9aFr9unHlsIrUpmT79XsoFFr7s3z8Og9ehSDlxB_fKr3nsOBsJjZMM-Q3CcPvkIRvIOPxtHaG2-k6gGZfyWJeBGeDx7Rw2NtGRWsvl23c51oSdAVqhF6E5Z_QrdkVzF6IoZtxp2yrSOvehjIQuIrq1yNMFe8rKhSvm7MEibfdYYSzy2vulA0-rOPS9RoFqRJTH72Bl2YsO4q9nVtDaNge-785FxrkhwKbHg8NZv3J6hyX0WWV8dxtYH-em8Y_97CCTUHhj6FnE25spucDJT5OknOnKsTjSCKNJXYh6DbA2dhfwYT2oVFUdE_Xl3Ay5lKoJ4-c0mpCgGdukoDAfZMkcf7mdxxMov1fYFNXvk",
  },
  {
    id: 4,
    title:
      "Carlson, L. E., & Garland, S. N. (2005). Impact of mindfulness-based stress reduction (MBSR) on sleep, mood, stress and fatigue symptoms in cancer outpatients. International journal of behavioral medicine, 12(4), 278-285.",
    segment:
      "Other research has found similarly high rates of sleep disturbance in cancer patients, with 45% (Engstrom, Strohl, Rose, Lewandowski, & Stefanek, 1999) and 75% (Malone, Harris, & Luscombe, 1994). Because of the high incidence of sleep-related concerns in cancer patients and the problems this creates, it is important to investigate methods that will assist in the management of sleep disturbance for this population",
    url: "https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=2538227b53d488c8f50d5f1b85b5b9c3a3cba646",
  },
  {
    id: 5,
    title:
      "Pelucchi, C., Tramacere, I., Boffetta, P., Negri, E., & Vecchia, C. L. (2011). Alcohol consumption and cancer risk. Nutrition and cancer, 63(7), 983-990.",
    segment:
      "Heavy alcohol consumption, defined as 4 or more drinks/day, is significantly associated with an increased risk of about fivefold for oral and pharyngeal cancer and esophageal squamous cell carcinoma, 2.5-fold for laryngeal cancer, 50% for colorectal and breast cancers, and 30% for pancreatic cancer",
    url: "https://web.archive.org/web/20170809095334id_/http://btl.library.org.il/images/links/btl/medlibalcoholcon_0.pdf",
  },
  {
    id: 6,
    title:
      "Key, T. J., Bradbury, K. E., Perez-Cornago, A., Sinha, R., Tsilidis, K. K., & Tsugane, S. (2020). Diet, nutrition, and cancer risk: what do we know and what is the way forward?. Bmj, 368.",
    segment:
      "Early case-control studies indicated that higher intakes of fruit and vegetables were associated with a lower risk of several types of cancer.11",
    url: "https://www.bmj.com/content/bmj/368/bmj.m511.full.pdf",
  },
  {
    id: 7,
    title:
      "Crosby, D., Bhatia, S., Brindle, K. M., Coussens, L. M., Dive, C., Emberton, M., ... & Balasubramanian, S. (2022). Early detection of cancer. Science, 375(6586), eaay9040.",
    segment:
      "The transition rate through these stages depends on the cancer type, therefore, understanding this timeline can help pinpoint the optimal time for detection and intervention.",
    url: "https://static1.squarespace.com/static/5e96377a2c8aee64d168790e/t/623b4e466df82b24ef37184e/1648053832293/Crosby+-+2022+-+Science+.pdf",
  },
  {
    id: 8,
    title:
      "Nelson, H. D., Cantor, A., Humphrey, L., Fu, R., Pappas, M., Daeges, M., & Griffin, J. (2016). Screening for Breast Cancer: A Systematic Review to Update the 2009 U.S. Preventive Services Task Force Recommendation. Annals of Internal Medicine, 164(4), 244-255.",
    segment:
      "Mammography screening reduces the risk for breast cancer death by approximately 20% in the populations studied...",
    url: "https://www.acpjournals.org/doi/10.7326/M15-0969",
  },
  {
    id: 9,
    title:
      "American Cancer Society. (2020). Colorectal Cancer Facts & Figures 2020-2022. ",
    segment:
      "Regular screening can reduce the risk of dying from colorectal cancer by 60% to 70%.",
    url: "https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/colorectal-cancer-facts-and-figures/colorectal-cancer-facts-and-figures-2020-2022.pdf",
  },
  {
    id: 10,
    title: "National Cancer Institute. (n.d.). Pap and HPV Testing. ",
    segment:
      "From 1955-1992, the number of cervical cancer deaths in the American population decreased each year by nearly 70% due in large part to the increased use and improved accuracy of the Pap test.",
    url: "https://www.cancer.gov/types/cervical/pap-hpv-testing-fact-sheet",
  },
];

const CitationPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const sortCitations = citationList.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const toggleReadMore = (itemId: number) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {citationList.map((item, index: number) => (
            <View key={item.id} style={styles.citationItem}>
              <Text style={styles.title}>{`${index + 1}. ${item.title}`}</Text>

              <Text style={styles.segment}>
                {expandedItems.includes(item.id) ? item.segment : ""}
              </Text>

              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => toggleReadMore(item.id)}>
                  <Text style={styles.show}>
                    {expandedItems.includes(item.id)
                      ? "Read Less"
                      : "Read More"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleLinkPress(item.url);
                  }}
                >
                  <Text style={styles.link}>Source</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  citationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  segment: {
    fontSize: 16,
    color: "#555",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  show: {
    color: "blue",
    flex: 1,
  },
  link: {
    color: "blue",
  },
});

export default CitationPage;
