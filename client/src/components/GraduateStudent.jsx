import React from 'react';
import { Card, CardActions, CardExpandable, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


const style_head = {fontSize: 20, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald", color: "#00b3b3", textDecoration: 'underline'}
const style_subhead = {fontSize: 15, fontWeight: 'bold', textAlign: 'left', fontFamily: "Oswald", color: "#00b3b3"}
const style_body1 = {fontSize: 16, textAlign: 'left', fontFamily: "Palatino"}

const style_card = {width: 900, height: 1420, marginBottom: 40, marginTop: -50, backgroundColor: "#e6ffff"};
const GraduateStudent = () => (
	<div>



  <Card className="container"
			style = {style_card}
	>


    <CardText
        style = {style_head}
    >

      Graduate Students

    </CardText>


    <CardText
        style = {style_subhead}
    >

      Current Students (PHD, unless otherwise specified)

      <br />

    </CardText>

    <CardText
        style = {style_body1}
    >

    1. Matin Kheirkhahan, ROAMM: Software Infrastruture for Mobile Healthcare Data<br />
    2. Mohamed Gadou, GPU Algorithms for Sparse Matrix Factorization<br />
    3. Yupeng Yan, Machine Learning for Large-scale Remote Sensing Datasets (co-advisee with Anand Rangarajan)<br />
    4. Chengliang Yang, Machine Learning for Health Care Datasets<br />
    5. Sanaz Geibi, Machine Learning for Large Scale Transportation Applications<br />
    6. Tania Banerjee, Postdoctoral Researcher, Performance and Energy Optimizations for Large scale Turbulent Flows<br />
    7. Xiaohui Huang, Machine Learning for Change Detection<br />
    8. Malavi Pathirannahalage Wijayasiri, GPU Algorithms for SAR Computation (co-advisee with Sartaj Sahni)<br />
    9. Mahmoud Pourmehrab, Signal Optimization for Autonomous and Connected Vehicles (co-advisee with Lily Elfeteradiou)<br />
    10. Patrick Enami, Optimization and Machine Learning for Intelligent Signal Control<br />
    11. Keke Zhai, Thermal Aware Computing<br />
    12. Dhruv Mahajan, Bigdata Infrastructure for Transportation Applications

         <br />

    </CardText>


     <CardText
        style = {style_subhead}
    >

      Past Graduate Students

      <br />

    </CardText>

    <CardText
        style = {style_body1}
    >

    Unless listed explicitly as a co-advisor, I was the principal advisor<br /><br />

    1. Todd Heywood, (1991), A Practical Hierarchical Model of Parallel Computation.  Technical Staff, IBM Poughkeepsie.<br />
    2. Anand Rangachari, (1992), Efficient Neural Algorithms for Multiclass Problems  . Technical Staff, IBM T. J. Watson Labs. (co-advisor with Kishan G. Mehrotra)<br />
    3. Yeh Chin Chung, (1992), Static Mapping and Scheduling Algorithms for Distributed Memory Multiprocessors. Associate Professor, Department of Computer Science, National Taiwan University, Taiwan R. O. C.<br />
    4. Jhy Chun Wang, (1993), Load Balancing and Communication Support for Irregular Problems.  Technical Staff, IBM Poughkeepsie.<br />
    5. Harpal Maini, (1994), Incorporating Knowledge in Genetic Optimization  . Technical Staff, Deutesche Morgan Bank. (co-advisor with Kishan G. Mehrotra)<br />
    6. M. C. Yang, (1994), 3-D Object Recognition and Description using parallel Geometric Hashing Algorithms.<br />
    7. David Koester, (1995), Parallel Block-Diagonal-Bordered Sparse Linear Systems for Power Systems Applications<br />
    8. Chao-Wei Ou. (1996),  Partitioning and Incremental Partitioning for Adaptive Irregular Problems, Technical Staff, Northeast Parallel Architecture Center.<br />
    9. Ravi Shankar (1996),  Scalable Parallel Algorithms for Random Accesses and Shared Memory Simulation.  Technical Staff, Bellcore.<br />
    10. Maher Kaddoura (1996),  Parallel Computing in Nonuniform and Adaptive Computational Environments. Technical Staff, Architecture Technology Corporation.<br />
    11. Seungjo Bae (1997), Runtime Support for High Performance Fortran, Technical Staff, ETRI (Korea)<br />
    12. Jang Sun Lee(1997), User Controllable Parallel I/O, Technical Staff, ETRI (Korea)<br />
    13. Khaled Alsabti (1998), Efficient Algorithms for Data Mining Primitives, Assistant Professor, King Fahd University, Saudi Arabia<br />
    14. Ibraheem Al-furaih (1998), Optimizing for Memory Hierarchy. Saudi Arabia<br />
    15. Hankil Yoon (2000), Efficient Processing of Large Sparse Datasets. Oracle Corporation.<br />
    16. Scott Winterstein (2000), Efficient Association Mining for Data Warehousing and E-Commerce.<br />
    17. Srijit Kamath (2005), Efficient Algorithms for Sequencing Multileaf Collimators (Postdoc at Stanford University College of Medicine) (co-advisor with Sartaj Sahni).<br />
    18. Jang Uk In, (2006), Policy Based Scheduling for Grid Environments, Microsoft Corporation.<br />
    19. Jun Liu (Feb 2008), Data Mining for CGH data, Google Corporation.<br />
    20. Xiuyao Song (2008), Data Mining for Anomaly Detection, Google Corporation.<br />
    21. Laukik Chitnis (2008). Very Large Scale Sensor Networks, Yahoo Corporation.<br />
    22. Jaeyeon Kang (2008), Energy minimization algorithms for Multicore machines, Samsung Research.<br />
    23. Parbati Manna (2008), Modeling Propagation of Internet Worms, Intel Corporation.<br />
    24. Manas Somaiya (2010), Data Mining for Transactional Data, Facebook.<br />
    25. Eunsung Jung (2010), Control Plane Scheduling Software for Optical Networks, Samsung Research Labs.<br />
    26. Yan Li (2010), Data Structures and Algorithms for resource scheduling in high speed networks. (co-advisee with Sartaj Sahni), Google Corporation.<br />
    27. Bin Song (2010), Inverse Algorithms for Metabolic Engineering, (co-advisor with Tamer Kahveci), Oracle Corporation.<br />
    28. Nirmalya Bandyopadhyay (2011), Modeling Perturbations in Gene Regulatory Networks, Johns Hopkins University.<br />
    29. Arslan Munir (2012), Modeling and Optimization of Parallel and Distributed Embedded Systems (co-advisee with Ann Gordon Ross), University of Nevada, Reno.<br />
    30. Abdullah Almutairi (2012), Efficient Algorithms for learning correlations in Large-scale Wireless Data, Kuwait University.<br />
    31. Zhe Wang (2012), Software and Algorithms for Energy and Temperature Minimization, Facebook.<br />
    32. Saeed Moghhaddam (2012), Large-Scale Mining of Mobile Online Behavior: Interest-Aware Modeling and Design Samsung Corporation (co-advisee with Ahmed Helmy), Samsung Research.<br />
    33. William Chapman (2013), Multicore Computing for Synthetic Aperture Radar.<br />
    34. Junjie Li (2013), GPU Computing for Bioinformatics Applications, (co-advisee with Sartaj Sahni), Optym Corporation.<br />
    35. Yifan Wang (2015), Energy-efficient and Thermal-Aware Task Scheduling on multi-core processors.<br />
    36. Hengxing Tan (2016), Performance, Energy and Thermal Tradeoffs for data parallel problems<br />

         <br />

    </CardText>



  </Card>
  </div>
);

export default GraduateStudent;
