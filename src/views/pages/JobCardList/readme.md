
  // static data
 

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  //   // fetchPaginatedJobs((page - 1) * pages);
  //   fetchJobs();
  // }, [offset]);



  useEffect(() => {
    const firstPageIndex = (page - 1) * pages;
    const lastPageIndex = firstPageIndex + pages;
    const currentTableData = data.slice(firstPageIndex, lastPageIndex);
    console.log(data.lengt, data, firstPageIndex, lastPageIndex);
    setJobList(currentTableData);
    setOriginalData(currentTableData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  
  const fetchPaginatedJobs = (currentOffset) => {
    setLoading(true);
    const apiFunction = isEmployer ? getEmployerJobs : getPaginatedJobs;

    apiFunction({ offset: 10, limit })
      .then((res) => {
        setJobList(res?.data);
        setOriginalData(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  };

  const fetchJobs = () => {
    setLoading(true);
    const apiFunction = isEmployer ? getEmployerJobs : getFreeLanceJobs;

    apiFunction()
      .then((res) => {
        setJobList(res?.data?.jobDetails);
        setOriginalData(res?.data?.jobDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  };
