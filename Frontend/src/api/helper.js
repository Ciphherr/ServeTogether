import Stack from "./contentstack";

export const getLandingPage = async () => {
  const Query = Stack.ContentType("landing_page_chirag")
    .Query()
    .includeReference([])
    .toJSON();

  const result = await Query.find();
  return result[0][0];
};

export const getOpportunities = async () =>{
  const Query = Stack.ContentType("opportunity_chirag")
    .Query()
    .includeReference([])
    .toJSON();

  const result = await Query.find();
  return result;
}

export const getOpportunityByUID = async (uid) => {
  const Query = Stack.ContentType("opportunity_chirag")
    .Query()
    .where("uid", uid)
    .includeReference([])
    .toJSON();

  const result = await Query.find();
  return result[0][0]; 
};

export const getOrganizations = async () => {
  try {
    const Query = Stack.ContentType("organizations_chirag").Query();

    const result = await Query
      .toJSON()
      .find();

    return result; // result[0] = entries
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
};

export const getOrganizationByUID = async (uid) => {
  const Query = Stack.ContentType("organizations_chirag")
    .Query()
    .where("uid", uid)
    .toJSON();

  const result = await Query.find();
  return result[0][0]; 
};

export const getOpportunitiesByOrganizationUID = async (organizationUID) => {
  const Query = Stack.ContentType("opportunity_chirag")
    .Query()
    .where("organised_by.uid", organizationUID)
    .includeReference([])
    .toJSON();

  const result = await Query.find();

  return result[0]; // array of opportunities
};

export const getUserProfileByEmail = async (email) => {
  try {
    const Query = Stack.ContentType("users_chirag") // 🔁 content type UID
      .Query()
      .where("email", email)
      .includeReference([]) // IMPORTANT
      .toJSON();

    const result = await Query.find();

    return result?.[0]?.[0] || null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};


export const getRegisteredOpportunitiesByUserUID = async (userUID) => {
  try {
    const Query = Stack.ContentType("registration_chirag")
      .Query()
      .where("user.uid", userUID)
      .toJSON();

    const registrations = await Query.find();
    console.log("Yehi:",registrations);

    // Extract opportunities
    const opportunityUIDs = registrations[0]
      .flatMap((reg) => reg.opportunity?.map(o => o.uid) || []);

    if (opportunityUIDs.length === 0) return [];

    const [opportunities] = await Stack
      .ContentType("opportunity_chirag")
      .Query()
      .containedIn("uid", opportunityUIDs)
      .toJSON()
      .find();

    return opportunities;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRegistrationByOpportunityAndUser = async (
  opportunityUid,
  userUid
) => {
  try {
    const query = Stack
      .ContentType("registration_chirag")
      .Query()

    query.where("opportunity.uid", opportunityUid)
    query.where("user.uid", userUid)

    const result = await query.toJSON().find()
    console.log(result[0][0]);

    if (result?.[0]?.length > 0) {
      return result[0][0] // first matching registration
    }

    return null
  } catch (error) {
    console.error(
      "Error fetching registration (Delivery SDK):",
      error
    )
    return null
  }
}
